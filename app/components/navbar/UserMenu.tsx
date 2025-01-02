import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState, useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModel";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModal();
  const rentModel = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del menú

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser!) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMenuItems = () => {
    if (!currentUser) {
      return (
        <>
          <MenuItem onClick={loginModel.onOpen} label="Ingresar" />
          <MenuItem onClick={registerModel.onOpen} label="Registrarse" />
        </>
      );
    }

    const userRole = currentUser?.role ?? "user";

    switch (userRole) {
      case "center-help":
        return (
          <>
            <MenuItem onClick={() => router.push("/ch-banns")} label="Amonestaciones" />
            <MenuItem onClick={() => router.push("/ch-reports")} label="Reportes" />
            <hr />
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })} label="Cerrar sesión" />
          </>
        );
      case "admin":
        return (
          <>
            <MenuItem onClick={() => router.push("/manage-users")} label="Usuarios" />
            <MenuItem onClick={() => router.push("/manage-posts")} label="Publicaciones" />
            <MenuItem onClick={() => router.push("/advices")} label="Avisos" />
            <hr />
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })} label="Cerrar sesión" />
          </>
        );
      case "user":
      default:
        return (
          <>
            <MenuItem onClick={() => router.push("/trips")} label="Mis viajes" />
            <MenuItem onClick={() => router.push("/favorites")} label="Favoritos" />
            <MenuItem onClick={() => router.push("/reservations")} label="Reservaciones" />
            <MenuItem onClick={() => router.push("/propierties")} label="Propiedades" />
            <MenuItem onClick={() => router.push("/user-profile")} label="Perfil" />
              <div
                onClick={rentModel.onOpen}
                className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
              >
                Conviértete en anfitrión
              </div>
            <hr />
            <MenuItem onClick={() => router.push("/help-center")} label="Centro de ayuda" />
            <hr />
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })} label="Cerrar sesión" />
          </>
        );
    }
  };

  return (
    <div ref={menuRef} className="relative">
  <div className="flex flex-row items-center gap-3">
    {(currentUser === null || currentUser?.role === "user") && (
      <div
        onClick={onRent}
        className="block text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
      >
        Conviértete en anfitrión
      </div>
    )}
    <div
      onClick={toggleOpen}
      className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
    >
      <AiOutlineMenu />
      <div className="hidden md:block">
        <Avatar src={currentUser?.image} />
      </div>
    </div>
  </div>

  {isOpen && (
    <div className="absolute rounded-xl shadow-md w-[300px] bg-white overflow-hidden right-0 top-full text-sm">
      <div className="flex flex-col space-y-2 cursor-pointer">
        {renderMenuItems()}
      </div>
    </div>
  )}
</div>

  );
  
};

export default UserMenu;
