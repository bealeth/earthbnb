import prisma from "@/app/libs/prismadb";

const getUserById = async (userId?: string) => {
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        listings: true, // Incluye las reseñas relacionadas con este usuario.
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      image: user.image || "/default-profile.png",
    };
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export default getUserById;
