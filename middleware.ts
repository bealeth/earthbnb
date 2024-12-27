export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        "/trips",
        "/reservations",
        "/propierties",
        "/favorites",
        "/about-us",
        "/terms",
        "/help-center"
    ]
}