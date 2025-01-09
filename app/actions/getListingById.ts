import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params:IParams
){
    try{
        const{listingId}= params;
        const listing = await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include: {
                user: true
            }
        });

        if(!listing){
            return null;
        }

        return{
            ... listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ... listing.user,
                name: listing.user.name,
                sanctionAmount: listing.user.sanctionAmount,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        };

    }
    catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(errorMessage);
    };
    
    
}