import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password, role } = body;

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { error: "El correo electrónico no tiene un formato válido. Debe incluir un '@' y terminar con '.com'" },
            { status: 400 }
        );
    }

    // Validar el formato de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return NextResponse.json(
            { error: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número" },
            { status: 400 }
        );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
            role: role || "user", // Asigna rol predeterminado
        },
    });

    // Respuesta exitosa
    return NextResponse.json(user);
}
