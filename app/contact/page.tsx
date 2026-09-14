"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSubmitted(true);
        setLoading(false);

        // Reset after 5 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8"
                        >
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({ ...formData, subject: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message</label>
                                        <Textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            className="min-h-[150px] bg-zinc-800 border-white/10 focus:border-primary"
                                            placeholder="Tell us more about your question..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                                    >
                                        {loading ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16"
                                >
                                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                                    <p className="text-zinc-400 text-center">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    We're here to help and answer any questions you might have. We look forward to hearing from you!
                                </p>
                            </div>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<Mail className="h-6 w-6" />}
                                    title="Email"
                                    content="support@gravityless.io"
                                    link="mailto:support@gravityless.io"
                                />
                                <ContactInfoItem
                                    icon={<Phone className="h-6 w-6" />}
                                    title="Phone"
                                    content="+1 (555) 123-4567"
                                    link="tel:+15551234567"
                                />
                                <ContactInfoItem
                                    icon={<MapPin className="h-6 w-6" />}
                                    title="Location"
                                    content="San Francisco, CA"
                                />
                            </div>

                            {/* Quick Links */}
                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                                <div className="space-y-3">
                                    <a href="/support" className="block text-zinc-400 hover:text-white transition-colors">
                                        → Support Center
                                    </a>
                                    <a href="/docs" className="block text-zinc-400 hover:text-white transition-colors">
                                        → Documentation
                                    </a>
                                    <a href="/#faq" className="block text-zinc-400 hover:text-white transition-colors">
                                        → FAQ
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ContactInfoItem({
    icon,
    title,
    content,
    link,
}: {
    icon: React.ReactNode;
    title: string;
    content: string;
    link?: string;
}) {
    const Content = (
        <div className="flex items-start gap-4 p-6 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-primary/30 transition-colors">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
            <div>
                <h4 className="font-semibold mb-1">{title}</h4>
                <p className="text-zinc-400">{content}</p>
            </div>
        </div>
    );

    if (link) {
        return <a href={link}>{Content}</a>;
    }

    return Content;
}
