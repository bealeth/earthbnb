'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Image from "next/image";

interface ListingHeadProps{
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
})=>{
    const{getByValue} =useCountries();
    const location = getByValue(locationValue);
    return(
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div
            className="
            w.fill
            h-[60vh]
            rounde-xl
            relative"
            >
                <Image
                    alt="image"
                    src={imageSrc}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ListingHead;