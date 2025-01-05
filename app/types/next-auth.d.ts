import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Agrega el campo `id` al tipo de usuario
    } & DefaultSession["user"]; // Retiene las propiedades predeterminadas
  }

  interface JWT {
    id: string; // Asegúrate de que el token también tenga un campo `id`
  }
}
