// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true, // Incluimos datos relevantes como roles
        image: true, // Incluye la URL de imagen si es necesaria
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}


// app/api/users/route.ts
export async function PUT(request: Request) {
  try {
    const { id, name, phone, bio, password, image } = await request.json();
    if (!id) return NextResponse.json({ error: "El ID es obligatorio" }, { status: 400 });

    // Si incluye contraseña, debes manejar el hashing (opcional)
    const updatedData: any = { name, phone, bio, image };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedData.hashedPassword = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
  }
}


// Amonestar usuario
export async function PATCH(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.user.update({
      where: { id },
      data: { role: "warned" }, // Marca como amonestado
    });
    return NextResponse.json({ message: "Usuario amonestado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al amonestar usuario" }, { status: 500 });
  }
}

// Eliminar usuario
export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
  }
}
