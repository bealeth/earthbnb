

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
    image: user.image || "/default-profile.png",
    createdAt: user.createdAt.toISOString(),
    updatedAt: new Date().toISOString(),
    emailVerified: null,
    role: "user",
    email: "",
    phone: "",
    bio: "El usuario no ha proporcionado una biografía.",
    hashedPassword: null,
    warnings: 0,
    favoritesIds: [],
    budget: 0,
    walletBalance: 0,
    sanctionAmount: 0,
    status: "active",
  };

  return (
    <div>
      <ClientOnly>
        <ProfileHead user={safeUser} />
      </ClientOnly>
    </div>
  );
};

export default UserProfile;
