import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    user?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, user, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (user) {
            query.user = { id: user }; // Corregido para manejar la relación
        }

        if (authorId) {
            query.listing = { user: { id: authorId } }; // Relación anidada corregida
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

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
    } catch (error: any) {
        throw new Error(error);
    }
}
