

import ClientOnly from "@/app/components/ClientOnly";
import ProfileHead from "./ProfileClient";
import getUserById from "@/app/actions/getUserById";

interface IParams {
  userId?: string;
}

const UserProfile = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params; // Asegúrate de esperar `params` primero
  const user = await getUserById(resolvedParams.userId);

  if (!user) {
    return (
      <div>
        <ClientOnly>
          <p>User not found</p>
        </ClientOnly>
      </div>
    );
  }

  const safeUser = {
    id: user.id,
    name: user.name || "Usuario desconocido",
    image: user.image || "/images/placeholder.png",
    createdAt: user.createdAt.toISOString(),
    updatedAt: new Date().toISOString(),
    emailVerified: null,
    role: "user",
    email: "no",
    phone: "",
    bio: user.bio,
    hashedPassword: null,
    warnings: 0,
    favoritesIds: [],
    budget: 0,
    walletBalance: 0,
    sanctionAmount: 0,
    status: "active",
    listings: user.listings || []
  };

  return (
    <div>
      <ClientOnly>
        <ProfileHead user={safeUser} />
        <div
            className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grids-cols-3
            lg:gris-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
            </div>
      </ClientOnly>
    </div>
  );
};

export default UserProfile;
