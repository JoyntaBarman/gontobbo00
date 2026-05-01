// components/home/Hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm">
                            <Zap className="mr-1 h-3.5 w-3.5 text-primary" />
                            <span>AI-Powered Learning Platform</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Master Your Learning with{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Smart Practice
              </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-lg">
                            Practice MCQ, create custom exams with time & marks configuration,
                            read short questions, and learn from blogs. All in one platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <Link href="/practice">
                                    Start Practice
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/create-quiz">Create Custom Quiz</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Dashboard Preview */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md rounded-xl border bg-card shadow-2xl overflow-hidden">
                            <div className="bg-muted/30 p-4 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                    <div className="h-3 w-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs font-mono">Dashboard Preview</span>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 w-full bg-muted rounded animate-pulse" />
                                    <div className="h-3 w-3/4 bg-muted rounded animate-pulse" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="h-16 rounded-lg bg-primary/5 border" />
                                    <div className="h-16 rounded-lg bg-primary/5 border" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}