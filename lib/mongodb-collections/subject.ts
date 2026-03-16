import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true,
})


// Prevent model overwrite in Next.js hot reload
export default mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
