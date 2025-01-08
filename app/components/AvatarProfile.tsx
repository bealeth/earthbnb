'use client';

import Image from "next/image";

interface AvatarProfileProps {
    src: string | null | undefined;
};

const AvatarProfile: React.FC<AvatarProfileProps> = ({
    src
}) => {
    
    return(
        <Image 
            className = "rounded-full"
            height = "300"
            width= "300"
            alt="Avatar"
            src= {src || "/images/placeholder.png"}/>
    );
}

export default AvatarProfile;