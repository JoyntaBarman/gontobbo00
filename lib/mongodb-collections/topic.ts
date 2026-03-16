import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            default: "",
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);
