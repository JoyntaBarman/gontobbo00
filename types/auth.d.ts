import { type DefaultSession } from "next-auth"

// Extend the built-in types
declare module "next-auth" {
    interface Session {
        user: {
            role: "super_admin" | "admin" | "user" // Add your specific roles here
        } & DefaultSession["user"]
    }

    interface User {
        role: "super_admin" | "admin" | "user"
    }
}

// Optional: If using JWT strategy, extend the JWT interface too
declare module "next-auth/jwt" {
    interface JWT {
        role: "super_admin" | "admin" | "user"
    }
}