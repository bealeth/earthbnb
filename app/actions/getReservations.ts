import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    user?: string;
    authorId?: string;
}

// Tipo de la respuesta que devolvería la consulta
interface IReservation {
    id: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    listing: {
        id: string;
        createdAt: Date;
        // Otros campos de "listing" que necesites
    };
    // otros campos necesarios de "reservation"
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, user, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (user) {
            query.user = { id: user };
        }

        if (authorId) {
            query.listing = { user: { id: authorId } };
        }

        // Tipar correctamente la consulta
        const reservations: IReservation[] = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Ahora TypeScript sabe que 'reservation' es de tipo 'IReservation'
        const SafeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            },
        }));

        return SafeReservation;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unexpected error occurred");
    }
}
