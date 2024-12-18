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

export default async function getListings(params: IListingsParams) {
    try {
        // Desestructurar el parámetro
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

        let query: any= {};

        // Añadir condición solo si userId existe
        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (broomCount) {
            query.broomCount = {
                gte: +broomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT ={
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        // Obtener listings desde Prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        });

        // Formatear las fechas a ISO
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: any) {
        throw new Error("Error al obtener las propiedades");
    }
}
