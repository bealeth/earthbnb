import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: Promise<IListingsParams>;
}

const Home = async (props: HomeProps) => {
  const searchParams = await props.searchParams;
  console.log("Parámetros de búsqueda (searchParams):", searchParams);

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Verificamos si el usuario está autenticado y si es admin o center-help
  const isUserAllowedToSeeListings =
    !currentUser || currentUser?.role === "user"; // Es permitido si no está logueado o si su rol es "user"

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  // Si el usuario no tiene permiso para ver las propiedades (admin o center-help), se regresa EmptyState
  if (!isUserAllowedToSeeListings) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
