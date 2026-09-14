"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQ } from "@/components/faq";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Brain, Sparkles, Target, Zap, Lock, Infinity } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const howItWorksRef = useRef(null);
  const isHowItWorksInView = useInView(howItWorksRef, { once: true });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse opacity-30" />

        <div className="max-w-5xl mx-auto text-center relative z-10 pt-20">
          {/* Main headline with gentle fade-in */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8 leading-[1.1]"
          >
            Offload your mental weight.
            <br />
            <span className="text-zinc-400">Let AI sort your chaos into clarity.</span>
          </motion.h1>

          {/* Subheadline with upward motion */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-zinc-500 mb-12 font-light"
          >
            Focus on one thing at a time.
          </motion.p>

          {/* CTAs with gentle fade */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/release">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-white text-black hover:bg-zinc-100 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                Release the Weight →
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button
                size="lg"
                variant="ghost"
                className="h-14 px-10 text-lg text-zinc-400 hover:text-white transition-colors duration-300"
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges with gentle fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-zinc-500"
          >
            <TrustBadge icon={<Zap className="h-4 w-4" />} text="Instant clarity in 2 minutes" delay={1.0} />
            <TrustBadge icon={<Lock className="h-4 w-4" />} text="100% private & secure" delay={1.1} />
            <TrustBadge icon={<Infinity className="h-4 w-4" />} text="Free forever starter plan" delay={1.2} />
          </motion.div>
        </div>
      </section>

      {/* Why GRAVITYLESS Section */}
      <section className="py-32 px-4 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Why GRAVITYLESS?</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Transform overwhelming mental clutter into organized clarity
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Brain Dump"
              description="Type or speak everything weighing on your mind. No organization needed—just release it."
              delay={0}
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="AI Sorting"
              description="AI categorizes thoughts into Urgent, Important, Someday, or Let Go."
              delay={0.2}
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="One-Action Focus"
              description="Get one clear task to focus on right now. No overwhelm. Just action."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-32 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">How It Works</h2>
            <p className="text-xl text-zinc-400 font-light">Three simple steps to mental clarity</p>
          </motion.div>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-12 top-8 bottom-8 w-px bg-zinc-800 hidden md:block">
              <motion.div
                initial={{ height: 0 }}
                animate={isHowItWorksInView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="w-full bg-gradient-to-b from-primary to-secondary"
              />
            </div>

            <div className="space-y-16">
              <StepCard
                number="01"
                title="Dump"
                description="Stream-of-consciousness input. Type or speak everything weighing on your mind. Deadlines, worries, ideas—everything."
                delay={0.2}
              />
              <StepCard
                number="02"
                title="Sort"
                description="AI analysis + Gravity Score (mental load index). Your thoughts are categorized and your mental weight is measured."
                delay={0.6}
              />
              <StepCard
                number="03"
                title="Focus"
                description="One most important action. Execute. Feel lighter. Stop the overwhelm and take clear action."
                delay={1.0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gravity Score Feature Highlight */}
      <section className="py-32 px-4 bg-gradient-to-b from-zinc-950/50 to-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <span className="text-sm text-zinc-500 uppercase tracking-widest">Signature Feature</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Gravity Score™
          </h2>
          <p className="text-xl text-zinc-400 mb-12 font-light max-w-2xl mx-auto">
            A real-time mental load index that measures your mental weight from 1-100
          </p>

          {/* Animated counter */}
          <div className="inline-block p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <AnimatedCounter target={24} />
            <p className="text-zinc-500 mt-4 text-sm">Your current mental load</p>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <section className="py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to feel lighter?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 font-light max-w-2xl mx-auto">
            Join thousands who've released their mental weight and regained clarity.
          </p>
          <Link href="/release">
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-white text-black hover:bg-zinc-100 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              Start Your First Release – Free →
            </Button>
          </Link>
          <p className="mt-6 text-sm text-zinc-600">No credit card required. Free forever.</p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function TrustBadge({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex items-center gap-2"
    >
      <span className="text-zinc-400">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="mb-6 inline-block p-4 rounded-xl bg-white/5 text-white"
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-light mb-4 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function StepCard({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative pl-24 md:pl-32"
    >
      <div className="absolute left-0 text-7xl md:text-8xl font-extralight text-zinc-800">
        {number}
      </div>
      <h3 className="text-3xl font-light mb-4 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed font-light text-lg max-w-xl">
        {description}
      </p>
    </motion.div>
  );
}

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-8xl font-extralight text-white">
      {count}
      <span className="text-4xl text-zinc-600 ml-2">/ 100</span>
    </div>
  );
}
