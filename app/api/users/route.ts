// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true, // Incluimos datos relevantes como roles
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}

// Amonestar usuario
export async function PATCH(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.user.update({
      where: { id },
      data: { role: "warned" }, // Marca como amonestado (esto depende de cómo manejas las amonestaciones)
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
