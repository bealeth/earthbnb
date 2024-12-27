import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, props: { params: Promise<IParams> }) {
    const params = await props.params;
    const currentUser = await getCurrentUser();

    // Validación del usuario actual
    if (!currentUser) {
      return NextResponse.error();
    }

    // Extraer listingId
    const { listingId } = params;
    if (!listingId || typeof listingId != "string") {
      throw new Error("Id incorrecto");
    }

    // Crear copia de favoritesIds y actualizar
    const favoritesIds = [...(currentUser.favoritesIds || [])];
    favoritesIds.push(listingId);

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        favoritesIds
      }
    });

    return NextResponse.json(user);
}

export async function DELETE(request: Request, props: {params: Promise<IParams>}) {
    const params = await props.params;
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId != 'string'){
        throw new Error("Id incorrecto");
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds = favoritesIds.filter((id)=> id !=listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
            favoritesIds
        }
    });

    return NextResponse.json(user);
}