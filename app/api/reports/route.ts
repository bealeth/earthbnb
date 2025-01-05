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
