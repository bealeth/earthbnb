import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmpyState from "@/app/components/EmpyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams{
    listingId?: string;
}

const ListingPage = async({ params }: {params: IParams})=>{
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if(!listing){
        return(
            <ClientOnly>
                <EmpyState/>
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
                />
        </ClientOnly>
    );
}

export default ListingPage;