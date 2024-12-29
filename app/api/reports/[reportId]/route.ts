import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, reason } = body;

  if (!listingId || !reason) {
    return NextResponse.error();
  }

  const report = await prisma.report.create({
    data: {
      listing: {
        connect: { id: listingId }, // Conectar el listado existente
      },
      user: {
        connect: { id: currentUser.id }, // Conectar el usuario actual
      },
      reason, // Guardar la razón proporcionada
    },
  });

  return NextResponse.json(report);
}
