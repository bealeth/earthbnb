'use client';

import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    const [role, setRole] = useState('');
    const [isRoleEnabled, setIsRoleEnabled] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const handleAccessKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value;
        setAccessKey(key);

        // Verifica la clave de acceso y habilita el campo de rol
        if (key === 'center-help1') {
            setRole('center-help');
            setIsRoleEnabled(true);
        } else if (key === 'admin') {
            setRole('admin');
            setIsRoleEnabled(true);
        } else {
            setRole('');
            setIsRoleEnabled(false);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Bienvenido a Earthbnb" subtitle="¡Únete al viaje!" center />
            <Input
                id="email"
                label="Correo electrónico"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Nombre"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Contraseña"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                validation={{
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 8,
                        message: "La contraseña debe tener al menos 8 caracteres",
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "La contraseña debe incluir al menos una mayúscula y un número",
                    },
                }}
            />

            <Input
                id="accessKey"
                type="password"
                label="Clave de Acceso"
                disabled={isLoading}
                value={accessKey}
                onChange={handleAccessKeyChange}
                required
            />
            <select
                id="role"
                value={role}
                disabled={!isRoleEnabled || isLoading}
                className="input"
                {...register('role')}
            >
                <option value="" disabled>
                    Selecciona un rol
                </option>
                {role && <option value={role}>{role}</option>}
            </select>
        </div>
    );

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post('/api/register', data)
            .then(() => {
                toast.success('Registrado con éxito');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch(() => {
                toast.error('Oh, no. Algo salió mal.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continuar con Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>¿Ya tienes una cuenta?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Inicia sesión
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Regístrate"
            actionLabel="Continuar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
