"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Need to create this
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

interface ReleaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReleaseModal({ isOpen, onClose }: ReleaseModalProps) {
    const [step, setStep] = useState<"INPUT" | "PROCESSING" | "RESULT">("INPUT");
    const [thought, setThought] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleRelease = async () => {
        if (!thought.trim()) return;

        setStep("PROCESSING");
        try {
            const res = await fetch("/api/release", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ thought }),
            });
            const data = await res.json();
            setResult(data);
            setStep("RESULT");
        } catch (e) {
            console.error(e);
            setStep("INPUT"); // Reset on error
        }
    };

    const reset = () => {
        setThought("");
        setStep("INPUT");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={reset}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-light tracking-wide text-center">
                        {step === "INPUT" && "What is heavy on your mind?"}
                        {step === "PROCESSING" && "Releasing weight..."}
                        {step === "RESULT" && "Clarity Found"}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6">
                    <AnimatePresence mode="wait">
                        {step === "INPUT" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Textarea
                                    placeholder="I am worried about..."
                                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-primary/50 resize-none text-lg"
                                    value={thought}
                                    onChange={(e) => setThought(e.target.value)}
                                />
                            </motion.div>
                        )}

                        {step === "PROCESSING" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-8"
                            >
                                {/* Cosmic spinner */}
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-spin border-t-primary" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-white animate-pulse" />
                                    </div>
                                </div>
                                <p className="mt-4 text-zinc-400 text-sm animate-pulse">AI is sorting your chaos...</p>
                            </motion.div>
                        )}

                        {step === "RESULT" && result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-4"
                            >
                                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                </div>

                                <div className="space-y-2">
                                    <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-zinc-400 border border-white/5">
                                        {result.type}
                                    </div>
                                    <h3 className="text-xl font-medium text-white">
                                        {result.aiSummary}
                                    </h3>
                                    <p className="text-sm text-zinc-500">
                                        Gravity reduced by <span className="text-primary font-bold">{result.gravityReduction} points</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter className="sm:justify-center">
                    {step === "INPUT" && (
                        <Button onClick={handleRelease} disabled={!thought.trim()} className="w-full bg-white text-black hover:bg-zinc-200">
                            Release <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    )}
                    {step === "RESULT" && (
                        <Button onClick={reset} variant="outline" className="w-full border-white/10 hover:bg-white/5">
                            Close & Feel Lighter
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
