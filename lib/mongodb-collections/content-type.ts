import mongoose, {Schema} from "mongoose";

const contentTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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
})


export default mongoose.models.ContentType || mongoose.model("ContentType", contentTypeSchema);