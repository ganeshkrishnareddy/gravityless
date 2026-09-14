"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, Sparkles, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function ReleasePage() {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError("Please write something before releasing");
            return;
        }

        setIsProcessing(true);
        setError("");

        try {
            const response = await fetch("/api/dumps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to process");
            }

            // Success - redirect to dashboard
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            {/* Main content */}
            <main className="flex-1 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Hero text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Release the Weight
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Type everything weighing on your mind. Don't organize it. Don't filter it.
                            <br />
                            <strong className="text-white">Just release.</strong>
                        </p>
                    </motion.div>

                    {/* Main form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="relative">
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What's on your mind? Everything from 'buy milk' to existential dread..."
                                className="min-h-[350px] text-lg bg-zinc-900/80 border-white/20 focus:border-primary/50 transition-colors resize-none backdrop-blur-sm"
                                disabled={isProcessing}
                            />

                            {/* Character count */}
                            <div className="absolute bottom-4 right-4 text-xs text-zinc-500 bg-black/50 px-2 py-1 rounded">
                                {content.length} characters
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit button */}
                        <div className="flex flex-col items-center gap-6">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isProcessing || !content.trim()}
                                className="h-16 px-12 text-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-xl shadow-primary/30 relative group disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                        AI is sorting your thoughts...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-3 h-6 w-6" />
                                        Sort My Chaos
                                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>

                            <p className="text-sm text-zinc-500">
                                Your thoughts will be organized into actionable tasks in seconds
                            </p>
                        </div>
                    </motion.form>

                    {/* Tips */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <h3 className="text-xl font-semibold">Tips for maximum clarity</h3>
                        </div>
                        <ul className="space-y-3 text-zinc-400 ml-9">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">→</span>
                                Write in stream-of-consciousness (no need to organize)
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">→</span>
                                Include deadlines if they matter ("presentation tomorrow")
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">→</span>
                                Mention feelings ("stressed about...", "worried that...")
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">→</span>
                                Don't hold back - the AI sorts everything automatically
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
