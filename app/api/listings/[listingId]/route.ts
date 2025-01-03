import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams{
    listingId?: string;
}

export async function DELETE(request: Request, props: {params:Promise<IParams>}) {
    const params = await props.params;
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId != 'string'){
        throw new Error('Id incorrecto');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}