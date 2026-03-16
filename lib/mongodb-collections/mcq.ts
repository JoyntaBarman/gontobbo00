import mongoose, { Schema, Types } from "mongoose";

const MCQSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 5000,
      unique: true,
    },

    options: {
      type: [String, "Must be string"],
      validate: {
        validator: function (opts: string[]) {
          const validOptions = opts.filter((o) => o && o.trim().length > 0);
          return validOptions.length >= 2 && opts.length <= 4;
        },
        message: "At least 2 options are required and max 4 allowed",
      },
      required: true,
    },

    writer: {
      type: [Schema.Types.ObjectId, "writer is required"],
      ref: "User",
      required: [true, "writer is required"],
    },

    correct_answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    subject_topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Subject topic is required"],
    },

    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    verified_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    difficulty: {
      type: Schema.Types.ObjectId,
      ref: "DifficultyLevel",
      required: [true, "Difficulty Level is required for this MCQ"],
    },

    explanation: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    //   required: [true, "Status is required for this MCQ"],
      default: "698d65330f317b4bb998216e",
    //   type: Schema.Types.ObjectId,
    //   ref: "Status",
    //   required: [true, "Status is required for this MCQ"],
    //   default: "698d65330f317b4bb998216e",
    },

    mark: {
      type: Number,
      min: 0,
      default: 1,
    },

    negative_mark: {
      type: Number,
      min: 0,
      default: 0,
    },

    is_multiple_correct: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      enum: ["MCQ", "True/False", "Multi Select"],
      default: "MCQ",
    },

    render: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String,
      maxlength: 500,
      validate: {
        validator: function (val: string | null) {
          if (!val) return true;
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        message: "Source must be a valid URL",
      },
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.MCQ || mongoose.model("MCQ", MCQSchema);
