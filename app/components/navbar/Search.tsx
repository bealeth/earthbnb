'use client';

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const {getByValue} = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate'); // Corrección aquí
    const guestCount = params?.get('getCount');
    
    const locationLabel = useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }

        return '¿Donde?';
    },[getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
    
            if (diff === 0) {
                diff = 1;
            }
    
            return `${diff} Days`;
        }
        return '¿Cuando?';
    }, [startDate, endDate]);
    

    const guestLabel = useMemo(()=>{
        if(guestCount){
            return `${guestCount} Huéspedes`
        }
        return 'Huéspedes';
    },[guestCount]);

    return(

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
            transitition
            cursor-pointer">
                <div 
                className="
                    flex
                    flex-row
                    items-center
                    justifiy-between">

                    <div 
                    className="
                        text-sm
                        font-semiblod
                        px-10">
                        {locationLabel}
                    </div>

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
                        
                        <div className="hidden sm:block">
                            {guestLabel}</div>
                        
                            <div 
                            className="
                            p-2
                            bg-blue
                            rounded-full
                            text-white
                                ">
                                <BiSearch size={18} />
                            </div>
                    </div>

                    
                    
                </div>
        </div>
    );
}

export default Search;