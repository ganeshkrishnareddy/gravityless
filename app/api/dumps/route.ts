import { NextResponse } from "next/server";
import { processBrainDump } from "@/lib/ai";
import dbConnect from "@/lib/db";
import BrainDump from "@/models/BrainDump";
import SortedTask from "@/models/SortedTask";

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json(
                { error: "Brain dump content is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Process with AI (has internal fallback)
        const aiResult = await processBrainDump(content);

        // Save brain dump
        const dump = await BrainDump.create({
            content,
            gravityScore: aiResult.gravityScore,
            processed: true,
        });

        // Save sorted tasks
        const tasks = await Promise.all(
            aiResult.tasks.map((task) =>
                SortedTask.create({
                    dumpId: dump._id,
                    title: task.title,
                    description: task.description,
                    category: task.category,
                    priority: task.priority,
                    actionable: task.actionable,
                    isFocused: task.title === aiResult.oneActionFocus,
                })
            )
        );

        return NextResponse.json({
            success: true,
            dump: {
                id: dump._id,
                gravityScore: dump.gravityScore,
            },
            tasks: tasks.map((t) => ({
                id: t._id,
                title: t.title,
                description: t.description,
                category: t.category,
                priority: t.priority,
                isFocused: t.isFocused,
            })),
            oneActionFocus: aiResult.oneActionFocus,
        });
    } catch (error) {
        console.error("Brain dump processing error:", error);
        return NextResponse.json(
            { error: "Failed to process brain dump" },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve user's dumps
export async function GET() {
    try {
        await dbConnect();

        const dumps = await BrainDump.find()
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({ dumps });
    } catch (error) {
        console.error("Fetch dumps error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dumps" },
            { status: 500 }
        );
    }
}
