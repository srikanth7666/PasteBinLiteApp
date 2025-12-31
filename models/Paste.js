const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  _id: String,
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.models.Paste || mongoose.model("Paste", pasteSchema);
