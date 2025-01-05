import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import AdminPage from "./components/adminHome";
import CenterPage from "./components/centerHome";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import Footer from "./components/footer/Footer";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: Promise<IListingsParams>;
}

const Home = async (props: HomeProps) => {
  let searchParams = (await props.searchParams) || {};

  console.log("Parámetros de búsqueda (searchParams):", searchParams);

  // Si searchParams es inválido, asigna valores predeterminados
  if (!searchParams || Object.keys(searchParams).length === 0) {
    console.warn("searchParams está vacío. Se usará un objeto por defecto.");
    searchParams = {};
  }

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const isAdmin = currentUser?.role === "admin";
  const isCenterHelp = currentUser?.role === "center-help";

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  if (isAdmin) {
    return (
      <ClientOnly>
        <AdminPage currentUser={currentUser} />
      </ClientOnly>
    );
  }

  if (isCenterHelp) {
    return (
      <ClientOnly>
        <CenterPage currentUser={currentUser} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </ClientOnly>
  );
};

export default Home;
