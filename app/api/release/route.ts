import { NextResponse } from "next/server";
import { processThought } from "@/lib/ai";
import dbConnect from "@/lib/db";
import Thought from "@/models/Thought";

// Define the interface for the AI result
interface AIResult {
    type: "ACTION" | "REFLECTION" | "LET_GO";
    summary: string;
    gravity_reduction: number;
}

export async function POST(req: Request) {
    try {
        const { thought } = await req.json();
        if (!thought) return NextResponse.json({ error: "No thought provided" }, { status: 400 });

        await dbConnect();

        // Mock AI if no key (fallback safety)
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({
                type: "ACTION",
                summary: "Define the first step clearly.",
                gravity_reduction: 5
            });
        }

        const result = await processThought(thought) as AIResult;

        // Save to DB
        const newThought = await Thought.create({
            content: thought,
            type: result.type,
            aiSummary: result.summary,
            gravityReduction: result.gravity_reduction,
            // userId: "demo-user" // hardcoded for now
        });

        return NextResponse.json(newThought);
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
