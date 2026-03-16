import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});

export default mongoose.models.ContentStatus || mongoose.model("ContentStatus", statusSchema);