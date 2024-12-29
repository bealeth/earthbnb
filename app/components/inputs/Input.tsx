import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    validation?: { [key: string]: any };
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    validation = {},
    register,
    errors = {},
    value,
    onChange,
    placeholder = " ",
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...(register
                    ? register(id, { required, ...validation })
                    : { value, onChange })}
                placeholder={placeholder}
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
                    formatPrice ? "pl-9" : "pl-4"
                } ${
                    errors?.[id] ? "border-blue" : "border-neutral-300"
                } ${errors?.[id] ? "focus:border-blue" : "focus:border-black"}`}
            />
            <label
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
                    formatPrice ? "left-9" : "left-4"
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                    errors?.[id] ? "text-blue" : "text-zinc-400"
                }`}
            >
                {label}
            </label>
            {/* Mensaje de error */}
            {errors?.[id] && typeof errors[id]?.message === "string" && (
                <p className="text-sm text-blue mt-2">{errors[id]?.message}</p>
            )}
        </div>
    );
};

export default Input;
