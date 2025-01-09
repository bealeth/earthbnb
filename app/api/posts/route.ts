import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Usuario no autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { title, detail, category, image } = body;

  if (!title || !detail || !category || !image) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        detail,
        category,
        image,
        authorId: currentUser.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    return NextResponse.json(
      { error: "Error al crear la publicación" },
      { status: 500 }
    );
  }
}

// Obtener todos los documentos
export async function GET() {
  try {
    const documents = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        detail: true,
        image: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        category: true,
      },
    });
    return NextResponse.json(documents);
  } catch (error: unknown) {
      if (error instanceof Error) {
          throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
  };

}

