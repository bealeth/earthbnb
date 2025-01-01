import { useRouter } from "next/navigation";

import UserProfile from "@/app/components/UserProfile";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getUserById from "@/app/actions/getUserById";

interface IParams {
  userId?: string;
}

const ProfilePage = async (props: { params: Promise<IParams> }) => {
  const params = await props.params;
  const user = await getUserById(params.userId);

  if (!user) {
    return (
      <ClientOnly>
        <EmptyState title="User not found" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UserProfile
        name={user.name || "Unknown user"}
        joinedDate={new Date(user.createdAt).getFullYear().toString()}
        profilePicture={user.image || "/default-profile.png"}
      />
    </ClientOnly>
  );
};

export default ProfilePage;
