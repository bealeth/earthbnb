'use client';
import { IconType } from "react-icons";

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    small?: boolean;
    outline?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> =  ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    
    return(
        <button
        onClick={onClick}
        disabled={disabled}

        className={`
        relative
        disabled: opacity-100
        rounded-lg
        disabled:cursor-not-allowed
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-blue'}
        ${outline ? 'border-black' : 'bg-blue'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        `}>
            {Icon &&(
                <Icon
                    size={24}
                    className="
                    absolute
                    left-4
                    top-3
                    "/>
            )}
            {label}
        </button>
    );
}

export default Button;