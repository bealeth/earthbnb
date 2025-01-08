'use client';

import Container from "@/app/components/Container";
import ProfileBoard from "@/app/components/ProfileBoard";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeUser2, SafeListing, SafeUser } from "@/app/types";

interface ProfileHeadProps {
  user: SafeUser2;// El objeto usuario debe cumplir con el tipo SafeUser2.
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ user }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        {/* Información del usuario */}
        <ProfileBoard
          name={user.name || "Usuario desconocido"}
          bio={user.bio}
          image={user.image || "/default-profile.png"}
          createdAt={user.createdAt}
        />
        {/* Listado de propiedades del usuario */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Propiedades de {user.name}
          </h2>
          {user.listings && user.listings.length > 0 ? (
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-6
              mt-4
              "
            >
              {user.listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  data={listing as SafeListing} // Asegúrate de que el tipo coincide con `SafeListing`.
                  currentUser={null} // Puedes personalizar según sea necesario.
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">
              Este usuario no tiene propiedades.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfileHead;
