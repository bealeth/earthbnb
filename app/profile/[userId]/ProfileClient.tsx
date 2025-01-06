'use client';

import Container from "@/app/components/Container";
import ProfileBoard from "@/app/components/ProfileBoard";
import { SafeUser } from "@/app/types";

interface ProfileHeadProps {
  user: SafeUser; // El objeto usuario debe cumplir con el tipo SafeUser.
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ user }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6"
        >
          <ProfileBoard
            name={user.name || "Usuario desconocido"}
            bio={user.bio || "El usuario no ha proporcionado una biografía."}
            imageUrl={user.image || "/default-profile.png"}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProfileHead;
