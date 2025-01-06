import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar que los campos necesarios estén presentes
    const { reporterId, reportedUserId, reason, sanctionAmount } = body;

    if (!reporterId || !reportedUserId || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newReport = await prisma.report.create({
      data: {
        reporterId,
        reportedUserId,
        reason,
        sanctionAmount,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
}

// GET: Obtener todos los reportes
export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        createdAt: true,
        status: true,
        sanctionAmount: true,
        reason: true,
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reportedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error al obtener los reportes:", error);
    return NextResponse.json(
      { error: "Error al obtener los reportes" },
      { status: 500 }
    );
  }
}