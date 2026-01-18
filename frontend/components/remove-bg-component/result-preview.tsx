"use client"

import { Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

interface ResultPreviewProps {
    original: string
    processed: string
    filename: string
    onDownload?: () => void
}

export function ResultPreview({
    original,
    processed,
    filename,
    onDownload,
}: ResultPreviewProps) {
    const handleDownload = async () => {
        if (onDownload) {
            onDownload()
            return
        }

        try {
            const response = await fetch(processed)
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `no-bg-${filename}`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Download failed:", error)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            <div className="rounded-xl border bg-card p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Result</h3>
                    <Button size="sm" onClick={handleDownload} className="gap-2">
                        <Download className="size-4" />
                        Download
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
                    {/* Before */}
                    <div className="space-y-2">
                        <p className="text-center text-xs font-medium text-muted-foreground">
                            Before
                        </p>
                        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted/30">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                                    backgroundSize: "16px 16px",
                                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                                }}
                            />
                            <Image
                                src={original || "/placeholder.svg"}
                                alt="Original"
                                fill
                                className="relative object-contain p-2"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden items-center justify-center md:flex">
                        <div className="rounded-full bg-muted p-2">
                            <ArrowRight className="size-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* After */}
                    <div className="space-y-2">
                        <p className="text-center text-xs font-medium text-muted-foreground">
                            After
                        </p>
                        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted/30">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                                    backgroundSize: "16px 16px",
                                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                                }}
                            />
                            <Image
                                src={processed || "/placeholder.svg"}
                                alt="Processed"
                                fill
                                className="relative object-contain p-2"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                    {filename}
                </p>
            </div>
        </motion.div>
    )
}
