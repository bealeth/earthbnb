import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage =  async () =>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Acción no permitida"
                    subtitle="Por favor, inicia sesión, o registrate."
                />
            </ClientOnly>
        );
    }


    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No se han encontrado reservaciones"
                    subtitle="Parece que no tiene reservacions en tus alojamientos"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default ReservationsPage;