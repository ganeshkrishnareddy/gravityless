import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SortedTask from "@/models/SortedTask";

export async function GET() {
    try {
        await dbConnect();

        const tasks = await SortedTask.find()
            .sort({ createdAt: -1 })
            .limit(50);

        // Group by category
        const grouped = {
            urgent: tasks.filter((t) => t.category === "URGENT"),
            important: tasks.filter((t) => t.category === "IMPORTANT"),
            someday: tasks.filter((t) => t.category === "SOMEDAY"),
            letGo: tasks.filter((t) => t.category === "LET_GO"),
        };

        // Find the focused task
        const focusedTask = tasks.find((t) => t.isFocused && !t.isCompleted);

        return NextResponse.json({
            tasks: grouped,
            focusedTask,
            totalCount: tasks.length,
        });
    } catch (error) {
        console.error("Fetch tasks error:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

// PATCH to update task status
export async function PATCH(req: Request) {
    try {
        const { taskId, updates } = await req.json();

        await dbConnect();

        const task = await SortedTask.findByIdAndUpdate(
            taskId,
            updates,
            { new: true }
        );

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, task });
    } catch (error) {
        console.error("Update task error:", error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}
