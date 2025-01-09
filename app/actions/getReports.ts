import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  reporterId?: string;
}

export default async function getReports(params: IParams) {
  try {
    const { listingId, userId, reporterId } = params;
    
    const query: any = {};
    if (listingId) query.reportedListingId = listingId;
    if (userId) query.userId = userId;
    if (reporterId) query.reporterId = reporterId;

    const reports = await prisma.report.findMany({
      where: query,
      include: {
        reporter: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Log para verificar el formato que estamos enviando
    console.log('Reports desde la base de datos:', reports);

    // Asegurarnos de que siempre devolvemos un array
    if (!Array.isArray(reports)) {
      console.error("Error: La respuesta no es un array");
      return []; // Si no es un array, devolver un arreglo vacío
    }

    const SafeReport = reports.map((report) => ({
      id: report.id,
      reporterName: report.reporterId || "Desconocido",
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt.toISOString(),
      sanctionAmount: report.sanctionAmount ?? null,
    }));

    console.log("Reportes formateados correctamente:", SafeReport);
    return SafeReport;

  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("Unexpected error occurred");
}
}
