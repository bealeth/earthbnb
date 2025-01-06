import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";



export async function PATCH(req: Request, { params }: { params: { reportId: string } }) {
  const { reportId } = params;

  try {
    const body = await req.json();

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: { ...body }, // Asegúrate de validar los datos antes de aplicarlos
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { reportId: string } }) {
  const { reportId } = params;

  try {
    await prisma.report.delete({
      where: { id: reportId },
    });

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete report" }, { status: 500 });
  }
}
