import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import UserSchema from "@/lib/mongodb-collections/user";


export const {handlers, signIn, signOut, auth} = NextAuth({

    providers: [Google],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user?.email) return false;

            if (account?.provider === "google") {
                // Check if user exists
                let existingUser = await UserSchema.findOne({ email: user.email });

                if (!existingUser) {
                    // Create user if not exist
                    existingUser = await UserSchema.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    });
                }

                // Attach DB user info to the user object for JWT callback
                (user as any)._id = existingUser._id;
                (user as any).role = existingUser.role;
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                // First sign-in, attach user data
                token.id = (user as any)._id.toString();
                token.role = (user as any).role;
                token.name = user.name;
                token.image = user.image;
            } else if (token.email) {
                // Subsequent requests, fetch user from DB to get fresh info
                const dbUser = await UserSchema.findOne({ email: token.email });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                    token.name = dbUser.name;
                    token.image = dbUser.image;
                }
            }

            return token;
        },

        async session({ session, token } : any) {
            if (token && session.user) {
                session.user.id = token?.id;
                session.user.name = token?.name;
                session.user.role = token?.role;
                session.user.image = token?.image;
            }
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: "g_token",
            options: {
                // httpOnly: process.env.NODE_ENV === "production",
                // sameSite: "lax",
                // path: "/",
                // secure: true,
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            }
        },
        csrfToken: {
            name: "g_c",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            }
        },
        callbackUrl: {
            name: "g_callback",
            options: {
                httpOnly: true,
                sameSite: "lax",
            }
        }
    }
})