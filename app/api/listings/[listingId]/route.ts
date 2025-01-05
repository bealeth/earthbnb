import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(request: Request, props: { params: Promise<IParams> }) {
    const params = await props.params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('ID incorrecto');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}

export async function GET(request: Request, props: { params: Promise<IParams> }) {
    try {
        const params = await props.params;
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
        }

        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            return NextResponse.json({ error: "ID del listado no proporcionado o incorrecto" }, { status: 400 });
        }

        // Consultar listado con sus reservas
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            include: { reservations: true },
        });

        if (!listing || listing.userId !== currentUser.id) {
            return NextResponse.json({ error: "No autorizado o listado no encontrado" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
