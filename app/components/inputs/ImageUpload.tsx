'use client';

import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";


declare global{
    let cloudinary: any; 
}
interface ImageUploadProps{
    onChange: (value: string) =>void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps>= ({
    onChange,
    value
}) =>{

    const handleUpload = useCallback((result: any) =>{
        onChange(result.info.secure_url);
    }, [onChange]);

    return(
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="radn12"
            options={{
                maxFiles: 1
            }}// Si no reconoce `onUpload`, mira `callback` en opciones.
            >
            {({ open }) => (
                <div
                onClick={() => open?.()}
                className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                <TbPhotoPlus size={50} />
                <div
                className="absolute inset-0 w-full h-full">
                    {value && (
                    <Image 
                        alt="Upload"
                        fill
                        style={{ objectFit: 'cover' }}
                        src={value} 
                    />
                    )}


                </div>
                </div>
            )}
            </CldUploadWidget>

    );
}

export default ImageUpload;