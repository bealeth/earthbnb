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
        reportedListing: true,
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
      reporterName: report.reporter?.name || "Desconocido",
      reportedListingTitle: report.reportedListing?.title || "Alojamiento no especificado",
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt.toISOString(),
      reviewedAt: report.reviewedAt ? report.reviewedAt.toISOString() : null,
      sanctionAmount: report.sanctionAmount ?? null,
    }));

    console.log("Reportes formateados correctamente:", SafeReport);
    return SafeReport;

  } catch (error: any) {
    console.error("Error al obtener los reportes: ", error);
    return []; // Devolver un arreglo vacío en caso de error
  }
}
