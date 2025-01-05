import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Usuario no autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, detail, category, image } = body;

    if (!title || !detail || !category || !image) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

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
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      // Consulta los posts con los campos relevantes
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          detail: true,
          category: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      // Convierte las fechas a formato ISO
      const formattedPosts = posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      }));
  
      // Devuelve los posts en formato seguro
      return NextResponse.json(formattedPosts);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
      return NextResponse.json(
        { error: "Error al obtener publicaciones" },
        { status: 500 }
      );
    }
  }