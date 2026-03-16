import mongoose, {Schema} from "mongoose";

const difficultylavelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true
    },
    description: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.DifficultyLevel || mongoose.model("DifficultyLevel", difficultylavelSchema);