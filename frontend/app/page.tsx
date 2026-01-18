"use client"

import { TabsContainer } from "@/components/remove-bg-component/tabs-container"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                            <Sparkles className="size-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                            BG Remover
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        Remove Image Background
                    </h1>
                    <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
                        Upload your images and instantly remove backgrounds with AI-powered
                        precision. Fast, easy, and free.
                    </p>
                </motion.div>

                <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                    <TabsContainer />
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mx-auto mt-16 max-w-3xl"
                >
                    <div className="grid gap-6 md:grid-cols-3">
                        <FeatureCard
                            title="Fast Processing"
                            description="Remove backgrounds in seconds with our optimized AI engine"
                        />
                        <FeatureCard
                            title="Batch Upload"
                            description="Process multiple images at once to save time"
                        />
                        <FeatureCard
                            title="High Quality"
                            description="Get clean, precise edges with transparent backgrounds"
                        />
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t py-6">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm text-muted-foreground">
                        Powered by AI background removal technology
                    </p>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({
    title,
    description,
}: {
    title: string
    description: string
}) {
    return (
        <div className="rounded-xl border bg-card p-5 text-center">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
