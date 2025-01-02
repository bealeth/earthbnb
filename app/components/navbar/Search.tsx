'use client';

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import Button from "../Button";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const {getByValue} = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate'); // Corrección aquí
    const guestCount = params?.get('guestCount');
    
    const locationLabel = useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }

        return '¿Dónde?';
    },[getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
    
            if (diff === 0) {
                diff = 1;
            }
    
            return `${diff} día(s)`;
        }
        return '¿Cuándo?';
    }, [startDate, endDate]);
    
    const router = useRouter();

    const guestLabel = useMemo(()=>{
        if(guestCount){
            return `${guestCount} huésped(es)`
        }
        return '¿Cuántos?';
    },[guestCount]);

    return (
        <div 
          onClick={searchModal.onOpen}
          className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer">
            
            <div 
              className="
                flex
                flex-row
                items-center
                justify-between">
                
              {/* Ubicación */}
              <div 
                className="
                  text-sm
                  px-10">
                {locationLabel}
              </div>
      
              {/* Duración */}
              <div 
                className="
                  hidden
                  sm:block
                  text-sm
                  px-6
                  border-x-[1px]
                  flex-1
                  text-center">
                {durationLabel}
              </div>
      
              {/* Huéspedes y Botones */}
              <div 
                className="
                  text-sm
                  pl-6
                  pr-2
                  text-gray-600
                  flex
                  flex-row
                  items-center
                  gap-3">
      
                {/* Cantidad de huéspedes */}
                <div className="hidden sm:block">
                  {guestLabel}
                </div>
      
                {/* Botón Limpiar Filtros */}
                <AiOutlineClear 
                  size={26} 
                  className="text-gray-500 hover:text-gray-700 transition cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el modal de búsqueda se abra
                    router.push('/'); // Navega al inicio o limpia los filtros
                  }} 
                />
      
                {/* Botón Buscar */}
                <div 
                  className="
                    p-2
                    bg-blue
                    rounded-full
                    text-white">
                  <BiSearch size={18} />
                </div>
              </div>
            </div>
        </div>
      );
      
}

export default Search;