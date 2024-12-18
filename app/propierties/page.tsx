import EmptyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import PClient from "./PClients";
import getListings from "../actions/getListings";

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
                    title = "Aún no tienes propiedades"
                    subtitle = "Conviértete en anfitrión"
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

