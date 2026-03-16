import { Adapter } from "next-auth/adapters";
import UserSchema from "@/lib/mongodb-collections/user";
import AccountSchema from "@/lib/mongodb-collections/account";
import connectDB from "@/lib/db";

export function authjsMongoDBAdapter(): Adapter {
    return {
        // Create a new user
        async createUser(data: any) {
            await connectDB();
            const user = await UserSchema.create({
                name: data.name,
                email: data.email,
                image: data.image,
                emailVerified: data.emailVerified ?? null,
            });
            return user.toObject();
        },

        // Get user by ID
        async getUser(id) {
            await connectDB();
            return UserSchema.findById(id).lean();
        },

        // Get user by email
        async getUserByEmail(email) {
            await connectDB();
            return UserSchema.findOne({ email }).lean();
        },

        // Get user by linked OAuth account
        async getUserByAccount({ provider, providerAccountId }) {
            await connectDB();
            const account = await AccountSchema.findOne({ provider, providerAccountId }).lean();
            if (!account) return null;
            return UserSchema.findById(account.userId).lean();
        },

        // Update user info
        async updateUser(data) {
            await connectDB();
            return UserSchema.findByIdAndUpdate(
                data.id,
                {
                    name: data.name,
                    email: data.email,
                    image: data.image,
                    emailVerified: data.emailVerified ?? null,
                },
                { new: true }
            ).lean();
        },

        // Delete user and linked accounts
        async deleteUser(userId) {
            await connectDB();
            await AccountSchema.deleteMany({ userId });
            return UserSchema.findByIdAndDelete(userId).lean();
        },

        // Link OAuth account to user
        // async linkAccount(account) {
        //     await connectDB();
        //     const existing = await AccountSchema.findOne({
        //         provider: account.provider,
        //         providerAccountId: account.providerAccountId,
        //     }).lean();
        //
        //     if (existing) return existing;
        //
        //     const created = await AccountSchema.create({
        //         userId: account.userId,
        //         type: account.type,
        //         provider: account.provider,
        //         providerAccountId: account.providerAccountId,
        //         access_token: account.access_token,
        //         refresh_token: account.refresh_token,
        //         expires_at: account.expires_at,
        //         token_type: account.token_type,
        //         scope: account.scope,
        //         id_token: account.id_token,
        //         session_state: account.session_state,
        //     });
        //
        //     return created.toObject();
        // },

        async linkAccount(account) {
            await connectDB();

            // Check if account already exists
            let existing = await AccountSchema.findOne({
                provider: account.provider,
                providerAccountId: account.providerAccountId,
            }).lean();

            if (existing) return existing;

            // Check if a user with same email exists
            let user = await UserSchema.findOne({ email: account.email }).lean();

            // if (!user) {
            //     // If no user exists, create one
            //     user = await UserSchema.create({
            //         name: account.name,
            //         email: account.email,
            //         image: account.image,
            //         emailVerified: account.emailVerified ?? null,
            //     }).lean();
            // }

            // Now link the OAuth account to the user
            const linkedAccount = await AccountSchema.create({
                userId: user._id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
            });

            return linkedAccount.toObject();
        },


        // Unlink OAuth account
        async unlinkAccount({ provider, providerAccountId }) {
            await connectDB();
            return AccountSchema.findOneAndDelete({ provider, providerAccountId }).lean();
        },

        // JWT session: no DB storage needed
        async createSession(session) {
            return session;
        },

        async getSessionAndUser(sessionToken) {
            // JWT-only → session is already verified by Auth.js
            return null;
        },

        async updateSession(session : any) {
            return session;
        },

        async deleteSession(sessionToken) {
            return null;
        },
    };
}
