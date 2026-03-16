import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            required: true, // "oauth"
        },

        provider: {
            type: String,
            required: true, // "google", "github"
            index: true,
        },

        providerAccountId: {
            type: String,
            required: true,
            index: true,
        },

        refresh_token: {
            type: String,
            default: null,
        },

        access_token: {
            type: String,
            default: null,
        },

        expires_at: {
            type: Number,
            default: null,
        },

        token_type: {
            type: String,
            default: null,
        },

        scope: {
            type: String,
            default: null,
        },

        id_token: {
            type: String,
            default: null,
        },

        session_state: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);


// 🔥 Prevent duplicate OAuth accounts
AccountSchema.index(
    { provider: 1, providerAccountId: 1 },
    { unique: true }
);

export default mongoose.models.Account ||
mongoose.model("Account", AccountSchema);
