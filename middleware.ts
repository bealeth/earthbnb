import { withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token as JWT; // Forzamos el tipo de `token`

        if (!token) {
            return new Response("No autorizado", { status: 401 });
        }

        // Validamos que token.role sea un string para evitar errores de tipo.
        if (typeof token.role !== "string") {
            return new Response("Error de token: rol inválido", { status: 400 });
        }

        const protectedRoutes: Record<string, string[]> = {
            "/trips": ["user"],
            "/reservations": ["user"],
            "/propierties": ["user"],
            "/favorites": ["user"],
            "/user-profile": ["user"],
            "/perfil": ["user"],
            "/reports": ["admin", "user"],
            "/manage-users": ["admin"],
            "/manage-posts": ["admin"],
            "/advices": ["admin"],
            "/public-profile": ["user"]
        };

        const path = req.nextUrl.pathname;

        // Verificar si la ruta está protegida
        const allowedRoles = protectedRoutes[path];
        if (!allowedRoles) {
            console.log(`Ruta no protegida o inexistente: ${path}`);
            return new Response("No protegida", { status: 404 });
        }

        // Validar si el usuario tiene el rol adecuado
        if (!allowedRoles.includes(token.role)) {
            return new Response("No tienes permisos para acceder a esta página", { status: 403 });
        }

        return new Response(null, { status: 200 }); // Acceso permitido
    },
    {
        pages: {
            signIn: "/auth/signin",
        },
    }
);

export const config = {
    matcher: [
    ],
};
