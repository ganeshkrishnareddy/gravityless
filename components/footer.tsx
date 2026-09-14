"use client";

import Link from "next/link";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
    const footerLinks = {
        Product: [
            { name: "Features", href: "/#features" },
            { name: "How It Works", href: "/#how-it-works" },
            { name: "Pricing", href: "/#pricing" },
            { name: "FAQ", href: "/#faq" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
        ],
        Legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
        Resources: [
            { name: "Documentation", href: "/docs" },
            { name: "Support", href: "/support" },
            { name: "Status", href: "/status" },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Mail, href: "/contact", label: "Email" },
    ];

    return (
        <footer className="bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                GRAVITYLESS
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-zinc-400">
                            Life without mental weight. Transform chaos into clarity.
                        </p>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-zinc-400">
                            © {new Date().getFullYear()} GRAVITYLESS. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
