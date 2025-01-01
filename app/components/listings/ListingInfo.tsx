'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Link from "next/link";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                {/* Información del anfitrión */}
                <div className="text-xl flex flex-row items-center gap-2">
                    <Link href={`/perfil/${user.id}`} legacyBehavior>
                        <a className="flex flex-row items-center gap-2 hover:underline">
                            <Avatar src={user?.image} />
                            <div className="text-blue-600 hover:text-blue-800">
                                El anfitrión es {user?.name || "Usuario"}
                            </div>
                        </a>
                    </Link>
                </div>


                {/* Detalles adicionales */}
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} huéspedes</div>
                    <div>{roomCount} habitaciones</div>
                    <div>{bathroomCount} baños</div>
                </div>
            </div>
            <hr />
            {/* Categoría */}
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            {/* Descripción */}
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            {/* Mapa */}
            <Map center={coordinates} />
        </div>
    );
};

export default ListingInfo;
