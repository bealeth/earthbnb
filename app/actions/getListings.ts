import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
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
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    // Crear la consulta inicial vacía con un tipo explícito
    const query: {
      userId?: string;
      roomCount?: { gte: number };
      bathroomCount?: { gte: number };
      guestCount?: { gte: number };
      locationValue?: string;
      category?: string;
      NOT?: {
        reservations: {
          some: {
            OR: Array<{
              endDate: { gte: string };
              startDate: { lte: string };
            }>;
          };
        };
      };
    } = {};

    // Construir la consulta con condiciones opcionales
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // >=
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount, // >=
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // >=
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // Manejar fechas de inicio y fin para evitar reservas conflictivas
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate }, // Reserva termina después del inicio del rango
                startDate: { lte: startDate }, // ...pero empieza antes del inicio
              },
              {
                startDate: { lte: endDate }, // Reserva empieza antes del fin del rango
                endDate: { gte: endDate }, // ...pero termina después del fin
              },
            ],
          },
        },
      };
    }

    // Realizar consulta en la base de datos con Prisma
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc", // Ordenar por fecha de creación descendente
      },
    });

    // Asegurar que las fechas sean seguras para el frontend
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(errorMessage);
  }
}
