import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema({
    userId: { type: String, required: false }, // Optional for now (demo mode)
    content: { type: String, required: true },
    type: {
        type: String,
        enum: ["ACTION", "REFLECTION", "LET_GO"],
        required: true
    },
    aiSummary: { type: String },
    gravityReduction: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Thought || mongoose.model("Thought", ThoughtSchema);
