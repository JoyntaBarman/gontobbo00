import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
            index: true,
        },

        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },

        role: {
            type: String,
            enum: ["user", "super_admin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        provider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "google",
        },

        providerId: {
            type: String, // OAuth provider ID
            default: null,
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);


// Prevent model overwrite in Next.js hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
