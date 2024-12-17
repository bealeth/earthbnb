import EmptyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClients";

const TripsPage = async() =>{
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

    const reservations = await getReservations({
        user: currentUser.id
    });

    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title = "Sin viajes"
                    subtitle = "Explora para encontrar destinos"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;

