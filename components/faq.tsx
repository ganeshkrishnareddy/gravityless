"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What is GRAVITYLESS?",
        answer: "GRAVITYLESS is an AI-powered mental clarity tool that helps you transform mental chaos into organized, actionable tasks. Simply dump all your thoughts, and our AI sorts them into categories, calculates your mental load (Gravity Score), and gives you one clear action to focus on.",
    },
    {
        question: "How does the Gravity Score work?",
        answer: "Your Gravity Score (1-100) measures your mental load based on the number of tasks, urgency levels, emotional weight, and complexity. The lower the score, the lighter you feel. Track it daily to see your mental clarity improve over time.",
    },
    {
        question: "Is my data private and secure?",
        answer: "Absolutely. Your brain dumps are encrypted and stored securely in our database. We never share your personal thoughts with third parties. You can delete your data anytime from your dashboard.",
    },
    {
        question: "How is this different from a to-do list app?",
        answer: "Traditional to-do lists make YOU organize. GRAVITYLESS does the opposite - you just release everything in stream-of-consciousness, and AI handles the organization. Plus, we focus on mental weight reduction, not just task completion.",
    },
    {
        question: "Do I need to pay to use GRAVITYLESS?",
        answer: "We offer a free tier with unlimited brain dumps and basic AI sorting. Premium features include advanced analytics, voice input, team sharing, and historical insights. Start free and upgrade when you're ready.",
    },
    {
        question: "Can I use this on mobile?",
        answer: "Yes! GRAVITYLESS works on all devices - desktop, tablet, and mobile. The interface is fully responsive, so you can release mental weight wherever you are.",
    },
    {
        question: "What if I don't want to write? Can I speak?",
        answer: "Voice input is coming soon in our premium tier! For now, typing is the fastest way to get your thoughts out. Most users find it takes less than 2 minutes to dump everything weighing on them.",
    },
    {
        question: "How accurate is the AI sorting?",
        answer: "Our AI is trained on thousands of brain dumps and achieves 90%+ categorization accuracy. If something is miscategorized, you can manually adjust it. The more you use it, the better it gets at understanding your patterns.",
    },
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-white/10 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left group"
            >
                <span className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                    {item.question}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-zinc-400 leading-relaxed">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    return (
        <section id="faq" className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-zinc-400">
                        Everything you need to know about GRAVITYLESS
                    </p>
                </motion.div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} item={item} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-zinc-400 mb-4">Still have questions?</p>
                    <a
                        href="/contact"
                        className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                        Contact our support team →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
