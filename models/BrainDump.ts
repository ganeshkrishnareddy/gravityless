import mongoose from "mongoose";

const BrainDumpSchema = new mongoose.Schema({
    userId: { type: String, required: false }, // Optional for demo mode
    content: { type: String, required: true },
    gravityScore: { type: Number, default: 0 }, // Mental load metric
    processed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BrainDump || mongoose.model("BrainDump", BrainDumpSchema);
