'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import React from "react";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import RentModal from "../modals/RentModal";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // Comprobación del rol del usuario para decidir qué mostrar
  const isUser = currentUser?.role === "user"; // Verifica si el usuario es "user"
  const isAdminOrCenterHelp =
    currentUser?.role === "admin" || currentUser?.role === "center-help"; // Verifica si el usuario es admin o center-help

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="p-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* Los usuarios "user" y no autenticados pueden ver el Search */}
            {!isAdminOrCenterHelp && <Search /> }
            {!isAdminOrCenterHelp && <RentModal /> }
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Mostrar Categories solo si el usuario no es admin, center-help, o está autenticado con otro rol */}
      {(currentUser && !isAdminOrCenterHelp) || !currentUser ? <Categories /> : null}
    </div>
  );
};

export default Navbar;
