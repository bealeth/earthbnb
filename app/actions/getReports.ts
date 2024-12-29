import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string; // Filtrar por ID del alojamiento
  userId?: string; // Filtrar por el ID del usuario que reportó
  authorId?: string; // Filtrar por ID del autor del alojamiento
}

export default async function getReports(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    // Filtrar por ID del alojamiento
    if (listingId) {
      query.listingId = listingId;
    }

    // Filtrar por el ID del usuario que realizó el reporte
    if (userId) {
      query.userId = userId;
    }

    // Filtrar por autor del alojamiento reportado
    if (authorId) {
      query.listing = { userId: authorId }; // Relación anidada
    }

    // Obtener reportes desde Prisma
    const reports = await prisma.report.findMany({
      where: query,
      include: {
        listing: true, // Incluir información del alojamiento relacionado
        user: true, // Incluir información del usuario que reportó
      },
      orderBy: {
        createdAt: "desc", // Ordenar reportes por fecha de creación, descendente
      },
    });

    // Formatear los reportes con fechas serializadas
    const SafeReports = reports.map((report) => ({
      ...report,
      createdAt: report.createdAt.toISOString(),
      listing: {
        ...report.listing,
        createdAt: report.listing.createdAt.toISOString(),
      },
      user: {
        ...report.user,
        createdAt: report.user.createdAt.toISOString(),
        updatedAt: report.user.updatedAt.toISOString(),
        emailVerified: report.user.emailVerified?.toISOString() || null,
      },
    }));

    return SafeReports;
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener reportes");
  }
}
