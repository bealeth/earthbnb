
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
    <div>
      
    </div>
  );
};

export default ProfilePage;
