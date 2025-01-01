import getUserById from "@/app/actions/getUserById";
import getListings from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import UserProfile from "@/app/components/UserProfile";
import PerfilClient from "@/app/perfil/[perfilId]/PerfilClients";

interface ProfilePageProps {
  params: { perfilId: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  // Asegúrate de esperar correctamente al acceso de params
  const { perfilId } = await params;

  // Cargar los datos del usuario según el perfilId de la URL.
  const user = await getUserById(perfilId);

  if (!user) {
    // Mostrar un estado vacío si el perfil no existe.
    return (
      <Container>
        <EmptyState
          title="Usuario no encontrado"
          subtitle="El perfil que buscas no existe o no está disponible."
        />
      </Container>
    );
  }

  // Puedes cargar otros datos relacionados si es necesario, como listados del usuario.
  const listings = await getListings({ userId: perfilId });

  // Renderizar el perfil del usuario con sus datos.
  return (
    <Container>
      <UserProfile
        name={user.name || "Usuario anónimo"}
        joinedDate={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Fecha no especificada"}
        profilePicture={user.image || "/placeholder-profile.png"} bio={""}      />
      {/* Puedes agregar una sección opcional para listados del usuario */}
      {listings.length > 0 && (
        <PerfilClient listings={listings} />
      )}

      
    </Container>
  );
};

export default ProfilePage;
