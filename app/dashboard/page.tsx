"use client";

import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, Lightbulb, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Task {
    _id: string;
    title: string;
    description: string;
    category: "URGENT" | "IMPORTANT" | "SOMEDAY" | "LET_GO";
    priority: number;
    isFocused: boolean;
    isCompleted: boolean;
}

interface TasksData {
    tasks: {
        urgent: Task[];
        important: Task[];
        someday: Task[];
        letGo: Task[];
    };
    focusedTask: Task | null;
    totalCount: number;
}

export default function DashboardPage() {
    const [tasksData, setTasksData] = useState<TasksData | null>(null);
    const [loading, setLoading] = useState(true);
    const [gravityScore, setGravityScore] = useState(0);

    useEffect(() => {
        fetchTasks();
        fetchGravityScore();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasksData(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGravityScore = async () => {
        try {
            const response = await fetch("/api/dumps");
            const data = await response.json();
            if (data.dumps && data.dumps.length > 0) {
                const latestScore = data.dumps[0].gravityScore || 0;
                setGravityScore(latestScore);
            }
        } catch (error) {
            console.error("Failed to fetch gravity score:", error);
        }
    };

    const markComplete = async (taskId: string) => {
        try {
            await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId,
                    updates: { isCompleted: true },
                }),
            });
            fetchTasks(); // Refresh
        } catch (error) {
            console.error("Failed to mark complete:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-zinc-400">Loading your clarity...</div>
            </div>
        );
    }

    const allTasks = tasksData?.tasks
        ? [
            ...tasksData.tasks.urgent,
            ...tasksData.tasks.important,
            ...tasksData.tasks.someday,
            ...tasksData.tasks.letGo,
        ]
        : [];

    const isEmpty = allTasks.length === 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Your Mental Clarity</h1>
                    <p className="text-zinc-400">
                        {isEmpty
                            ? "Start by releasing your thoughts"
                            : `Managing ${allTasks.length} items`}
                    </p>
                </div>
                <Link href="/release">
                    <Button
                        size="lg"
                        className="rounded-full h-12 px-6 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Release Weight
                    </Button>
                </Link>
            </div>

            {/* Gravity Score Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
            >
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                    <h3 className="text-zinc-400 font-medium mb-1">Gravity Score</h3>
                    <div className="text-5xl font-bold text-white mb-2">
                        {gravityScore}
                        <span className="text-lg text-zinc-500 font-normal ml-2">/ 100</span>
                    </div>
                    <p className="text-sm text-zinc-400">
                        {gravityScore < 30
                            ? "🌟 Feeling light"
                            : gravityScore < 60
                                ? "📊 Moderate load"
                                : "⚠️ Heavy mental weight"}
                    </p>

                    {/* Visual Bar */}
                    <div className="mt-6 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-secondary to-primary transition-all"
                            style={{ width: `${gravityScore}%` }}
                        />
                    </div>
                </div>

                {/* Focus Item */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden flex flex-col justify-between">
                    {tasksData?.focusedTask ? (
                        <>
                            <div>
                                <h3 className="text-zinc-400 font-medium mb-4">🎯 Current Focus</h3>
                                <p className="text-xl text-white font-medium">
                                    {tasksData.focusedTask.title}
                                </p>
                                {tasksData.focusedTask.description && (
                                    <p className="text-sm text-zinc-400 mt-2">
                                        {tasksData.focusedTask.description}
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={() => markComplete(tasksData.focusedTask!._id)}
                                variant="outline"
                                className="w-fit mt-4 border-white/10 hover:bg-white/5"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark Complete
                            </Button>
                        </>
                    ) : (
                        <div>
                            <h3 className="text-zinc-400 font-medium mb-4">🎯 Current Focus</h3>
                            <p className="text-zinc-500">
                                {isEmpty ? "Release your thoughts to get your focus" : "No focus set yet"}
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Tasks by Category */}
            {!isEmpty && tasksData && (
                <div className="space-y-6">
                    {tasksData.tasks.urgent.length > 0 && (
                        <TaskSection
                            title="🔥 Urgent"
                            tasks={tasksData.tasks.urgent}
                            onComplete={markComplete}
                            color="border-red-500/20"
                        />
                    )}
                    {tasksData.tasks.important.length > 0 && (
                        <TaskSection
                            title="⭐ Important"
                            tasks={tasksData.tasks.important}
                            onComplete={markComplete}
                            color="border-yellow-500/20"
                        />
                    )}
                    {tasksData.tasks.someday.length > 0 && (
                        <TaskSection
                            title="💡 Someday"
                            tasks={tasksData.tasks.someday}
                            onComplete={markComplete}
                            color="border-blue-500/20"
                        />
                    )}
                    {tasksData.tasks.letGo.length > 0 && (
                        <TaskSection
                            title="🌊 Let Go"
                            tasks={tasksData.tasks.letGo}
                            onComplete={markComplete}
                            color="border-zinc-500/20"
                        />
                    )}
                </div>
            )}

            {/* Empty state */}
            {isEmpty && (
                <div className="text-center py-16">
                    <div className="mb-6 text-6xl">🌬️</div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Mind Empty, Heart Light</h3>
                    <p className="text-zinc-400 mb-8">Release your first brain dump to get started</p>
                    <Link href="/release">
                        <Button size="lg">
                            <Plus className="mr-2 h-5 w-5" /> Start Now
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

function TaskSection({
    title,
    tasks,
    onComplete,
    color,
}: {
    title: string;
    tasks: Task[];
    onComplete: (id: string) => void;
    color: string;
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className={`p-4 rounded-xl bg-zinc-900/50 border ${color} flex items-start justify-between gap-4`}
                    >
                        <div className="flex-1">
                            <p className="text-white font-medium">{task.title}</p>
                            {task.description && (
                                <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                            )}
                        </div>
                        <Button
                            onClick={() => onComplete(task._id)}
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-green-400"
                        >
                            <CheckCircle2 className="h-5 w-5" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
