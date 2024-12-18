'use client';
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../navbar/Categories";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModel";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const guestCount =watch('guestCount');
    const  bathroomCount = watch('bathroomCount');
    const roomCount =watch('roomCount');
    const location = watch('location');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(()=> dynamic(()=>import('../Map'),{
        ssr:false
    }),[location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
            
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(step != STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('¡Alojamiento guardado!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() =>{
            toast.error('¡Oh, no! Algo salió mal');

        }).finally(() =>{
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(()=>{
        if(step == STEPS.PRICE){
            return 'Hecho';
        }

        return 'Siguiente';
    }, [step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step ==STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="¿Cómo describes tu alojamiento?"
            subtitle="Selecciona una categoría"
            />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            ">
                {categories.map((item) =>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={category => 
                                setCustomValue('category', category)}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.LOCATION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                title="¿Dónde se encuenta tu alojamiento?"
                subtitle="¡Ayudanos a encontrarte!"
                />
                <CountrySelect
                value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Dinos los generales de tu alojamiento"
                subtitle="¿Qué amenidades tiene?"
                />
                <Counter
                    title="Huéspedes"
                    subtitle="¿Para cuántas personas está habilitado?"
                    value={guestCount}
                    onChange={(value) =>setCustomValue('guestCount', value)}
                />
                <hr/>
                <Counter
                    title="Habitaciones"
                    subtitle="¿Cuántas habitaciones tiene?"
                    value={roomCount}
                    onChange={(value) =>setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title="Baños"
                    subtitle="¿Cuántos baños tiene?"
                    value={bathroomCount}
                    onChange={(value) =>setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if(step == STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Agrega imágenes de tu alojamiento"
                    subtitle="Muestra a los huéspedes como luce tu alojamiento."
                />
                <ImageUpload
                value={imageSrc}
                onChange={(value) =>setCustomValue('imageSrc', value)} />
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Cómo describirías tu alojamiento?"
                    subtitle="Sé claro y conciso."
                />
                <Input 
                    id="title"
                    label="Nombre del alojamiento"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input 
                    id="description"
                    label="Descripción"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
            </div>
        )
    }

    if(step == STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Establece el precio"
                subtitle="¿Cuántos pagarán por una noche?"
                />
                <Input 
                    id="price"
                    label="Precio"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CATEGORY  ? undefined : onBack}
            title="Conviértete en anfitrión"
            body={bodyContent}
        />
    )
}

export default RentModal;