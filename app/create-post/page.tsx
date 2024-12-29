import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getListings from "../actions/getListings";
import PClient from "../propierties/PClients";

const PropertiesPage = async() =>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title = "Acción no permitida"
                    subtitle = "Por favor, inicia sesión"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title = "Vaya, ¿qué ha ocurrido?"
                    subtitle = "Verifica el código"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;

