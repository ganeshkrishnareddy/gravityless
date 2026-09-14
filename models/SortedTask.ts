import mongoose from "mongoose";

const SortedTaskSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    dumpId: { type: mongoose.Schema.Types.ObjectId, ref: "BrainDump" },
    title: { type: String, required: true },
    description: { type: String },
    category: {
        type: String,
        enum: ["URGENT", "IMPORTANT", "SOMEDAY", "LET_GO"],
        required: true
    },
    priority: { type: Number, default: 0 }, // 1-10 scale
    actionable: { type: Boolean, default: true },
    isCompleted: { type: Boolean, default: false },
    isFocused: { type: Boolean, default: false }, // The "one action" focus
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SortedTask || mongoose.model("SortedTask", SortedTaskSchema);
