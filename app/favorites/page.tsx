import EmptyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async()=>{
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No se han encontrado favoritos"
                    subtitle="Parece que no has agregado favoritos a la lista"
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;