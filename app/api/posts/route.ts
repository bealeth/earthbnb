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

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    // Mapear los posts para asegurar que las fechas sean cadenas ISO
    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: {
        ...post.author,
        createdAt: post.author.createdAt.toISOString(),
        updatedAt: post.author.updatedAt.toISOString(),
      },
    }));

    return NextResponse.json(safePosts);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener publicaciones" },
      { status: 500 }
    );
  }
}

