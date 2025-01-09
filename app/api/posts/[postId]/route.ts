import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// No es necesario definir la interfaz IParams si usas el tipo de Next.js para rutas dinámicas
export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } } // Tipado correcto
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.error("Usuario no autorizado.");
    return NextResponse.json(
      { error: "Usuario no autorizado" },
      { status: 401 }
    );
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    console.error("ID de la publicación inválido.");
    return NextResponse.json(
      { error: "ID de la publicación inválido" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      console.error("Publicación no encontrada.");
      return NextResponse.json(
        { error: "Publicación no encontrada" },
        { status: 404 }
      );
    }

    if (post.authorId !== currentUser.id) {
      console.error("No autorizado para eliminar esta publicación.");
      return NextResponse.json(
        { error: "No autorizado para eliminar esta publicación" },
        { status: 403 }
      );
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    return NextResponse.json(
      { error: "Error al eliminar la publicación" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } } // Tipado correcto
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.error("Usuario no autorizado.");
    return NextResponse.json(
      { error: "Usuario no autorizado" },
      { status: 401 }
    );
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    console.error("ID de la publicación inválido.");
    return NextResponse.json(
      { error: "ID de la publicación inválido" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { title, detail, image } = body;

  if (!title || !detail || !image) {
    console.error("Datos de actualización incompletos.");
    return NextResponse.json(
      { error: "Datos de actualización incompletos" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      console.error("Publicación no encontrada.");
      return NextResponse.json(
        { error: "Publicación no encontrada" },
        { status: 404 }
      );
    }

    if (post.authorId !== currentUser.id) {
      console.error("No autorizado para actualizar esta publicación.");
      return NextResponse.json(
        { error: "No autorizado para actualizar esta publicación" },
        { status: 403 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        detail,
        image,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return NextResponse.json(
      { error: "Error al actualizar la publicación" },
      { status: 500 }
    );
  }
}
