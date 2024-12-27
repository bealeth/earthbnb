'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () =>{
    const router = useRouter();
    const searchModal= useSearchModal();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setbathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(()=>dynamic(()=>import('../Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(()=>{
        setStep((value)=>value - 1);
    },[]);

    const onNext = useCallback(()=>{
        setStep((value)=>value + 1);
    },[]);

    const onSubmit = useCallback(async()=>{
        if(step != STEPS.INFO){
            return onNext();
        }

        let currentQuery ={};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any ={
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
        

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        },{skipNull:true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
         
    },[
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(()=>{
        if(step == STEPS.INFO){
            return 'Search';
        }

        return 'Next';
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step == STEPS.LOCATION){
            return undefined;
        }

        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="¿A dónde quieres ir?"
                subtitle="Encuentra el lugar indicado"
            />
            <CountrySelect
                value={location}
                onChange={(value)=>
                    setLocation(value as CountrySelectValue)
                }
            />
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if(step == STEPS.DATE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Cuándo planeas ir?"
                    subtitle="Anota la fecha en tu agenda"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value)=>setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-3">
                <Heading
                    title="Más información"
                    subtitle="Encuentra el lugar perfecto para ti."
                />
                <Counter
                    title="Invitados"
                    subtitle="¿Cuántos se suman al plan?"
                    value={guestCount}
                    onChange={(value)=>setGuestCount(value)}
                />
                <Counter
                    title="Habitaciones"
                    subtitle="¿Cuántas habitaciones prefieren?"
                    value={roomCount}
                    onChange={(value)=>setRoomCount(value)}
                />
                <Counter
                    title="Baños"
                    subtitle="¿Cuántos baños prefieren?"
                    value={bathroomCount}
                    onChange={(value)=>setbathroomCount(value)}
                />
            </div>
        )
    }
    return(
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtros de búsqueda"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;