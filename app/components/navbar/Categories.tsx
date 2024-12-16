'use client';

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { LuCastle, LuSnowflake } from "react-icons/lu";
import { GiForestCamp, GiIsland } from "react-icons/gi";
import { GoContainer } from "react-icons/go";

export const categories = [
    {
        label: 'Playa',
        icon: TbBeach,
        description: 'Con cercanía a la playa'
    },
    {
        label: 'Moderno',
        icon: MdOutlineVilla,
        description: 'Lugar moderno'
    },
    {
        label: 'Alberca',
        icon: TbPool,
        description: 'Lugar con alberca'
    },
    {
        label: 'Contenedor',
        icon: GoContainer,
        description: '¡Vive la experiencia de estar en un contendor!'
    },
    {
        label: 'Castillo',
        icon: LuCastle,
        description: '¡Sumergete en la historia!'
    },
    {
        label: 'Ártico',
        icon: LuSnowflake,
        description: '¡Trae las cobijas!'
    },
    {
        label: 'Montaña',
        icon: TbMountain,
        description: '¡Mira todo desde arriba!'
    }
    ,
    {
        label: 'Acampada',
        icon: GiForestCamp,
        description: '¡Ingresa al bosque!'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }
    
    return(
        <Container>
            <div
            className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
            ">
                {categories.map((item) =>(
                    <CategoryBox 
                    key={item.label}
                    label={item.label}
                    selected={category == item.label}
                    icon={item.icon}

                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;