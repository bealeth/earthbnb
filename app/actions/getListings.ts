
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    broomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params: IListingsParams = {}) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      broomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    const query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: Number(roomCount) };
    if (broomCount) query.broomCount = { gte: Number(broomCount) };
    if (guestCount) query.guestCount = { gte: Number(guestCount) };
    if (locationValue) query.locationValue = locationValue;

    // Validar fechas antes de agregarlas a la consulta
    if (startDate && endDate) {
      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        throw new Error("Fechas inválidas.");
      }

      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.error("Error en getListings:", error); // Log real del error
    throw new Error(`Error al obtener las propiedades: ${error.message}`);
}

}
