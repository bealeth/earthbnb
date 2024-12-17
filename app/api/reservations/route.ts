import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if(!listingId || !startDate || !endDate ||!totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: { id: listingId },
        data: {
          reservations: {
            create: {
              user: {
                connect: { id: currentUser.id }, // Conectar el usuario existente
              },
              startDate,
              endDate,
              totalPrice
            },
          },
        },
        include: { reservations: true },
      });
      

    return NextResponse.json(listingAndReservation);
}