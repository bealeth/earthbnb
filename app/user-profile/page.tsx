import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getListings from "../actions/getListings";
import ProfileClient from "./ProfileClient";

const ProfilePage = async() =>{
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

    return(
        <ClientOnly>
            <ProfileClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ProfilePage;

