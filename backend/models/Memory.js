const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Memory", memorySchema);