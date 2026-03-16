import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        toLowerCase: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.models.Role || mongoose.model("Role", roleSchema);