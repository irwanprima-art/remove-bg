"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRemoveBgMultiple, type FileWithProgress } from "@/hooks/use-remove-bg"
import { motion, AnimatePresence } from "framer-motion"
import {
    Wand2,
    RotateCcw,
    Download,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { UploadArea } from "./upload-area"

function FileCard({ file }: { file: FileWithProgress }) {
    const statusColors = {
        idle: "border-muted-foreground/25",
        uploading: "border-primary",
        success: "border-green-500",
        error: "border-destructive",
    }

    const handleDownload = async () => {
        if (!file.result?.processed) return

        try {
            const response = await fetch(file.result.processed)
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `no-bg-${file.result.filename}`
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative overflow-hidden rounded-xl border-2 bg-card transition-colors ${statusColors[file.status]}`}
        >
            <div className="grid grid-cols-2 gap-2 p-2">
                {/* Before */}
                <div className="space-y-1">
                    <p className="text-center text-xs text-muted-foreground">Before</p>
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                                backgroundSize: "12px 12px",
                                backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                            }}
                        />
                        <Image
                            src={file.preview || "/placeholder.svg"}
                            alt={file.file.name}
                            fill
                            className="relative object-contain p-1"
                            unoptimized
                        />
                    </div>
                </div>

                {/* After */}
                <div className="space-y-1">
                    <p className="text-center text-xs text-muted-foreground">After</p>
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                                backgroundSize: "12px 12px",
                                backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                            }}
                        />
                        {file.status === "success" && file.result?.processed ? (
                            <Image
                                src={file.result.processed || "/placeholder.svg"}
                                alt={`Processed ${file.file.name}`}
                                fill
                                className="relative object-contain p-1"
                                unoptimized
                            />
                        ) : file.status === "uploading" ? (
                            <div className="flex h-full items-center justify-center">
                                <Loader2 className="size-6 animate-spin text-primary" />
                            </div>
                        ) : file.status === "error" ? (
                            <div className="flex h-full items-center justify-center">
                                <AlertCircle className="size-6 text-destructive" />
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <span className="text-xs text-muted-foreground">Pending</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress bar for uploading state */}
            {file.status === "uploading" && (
                <div className="px-2 pb-2">
                    <Progress value={file.progress} className="h-1" />
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t bg-background/50 px-2 py-1.5">
                <p className="max-w-25 truncate text-xs text-muted-foreground">
                    {file.file.name}
                </p>

                <div className="flex items-center gap-1">
                    {file.status === "success" && (
                        <>
                            <CheckCircle2 className="size-4 text-green-500" />
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={handleDownload}
                                className="size-6"
                            >
                                <Download className="size-3" />
                            </Button>
                        </>
                    )}
                    {file.status === "error" && (
                        <span className="text-xs text-destructive">Failed</span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export function MultipleImagesTab() {
    const {
        files,
        isProcessing,
        globalProgress,
        addFiles,
        // removeFile,
        processAllImages,
        reset,
    } = useRemoveBgMultiple()

    const hasFiles = files.length > 0
    const hasResults = files.some((f) => f.status === "success")
    const hasErrors = files.some((f) => f.status === "error")
    const allProcessed = files.length > 0 && files.every((f) => f.status === "success" || f.status === "error")

    const handleDownloadAll = async () => {
        const successfulFiles = files.filter(
            (f) => f.status === "success" && f.result?.processed
        )

        for (const file of successfulFiles) {
            try {
                const response = await fetch(file.result!.processed)
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `no-bg-${file.result!.filename}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                await new Promise((resolve) => setTimeout(resolve, 300))
            } catch (error) {
                console.error("Download failed:", error)
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Upload area - always visible when not processing */}
            {!isProcessing && (
                <UploadArea
                    onFilesSelected={addFiles}
                    multiple
                    disabled={isProcessing}
                />
            )}

            {/* Global progress when processing */}
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border bg-card p-4"
                >
                    <div className="flex items-center gap-3">
                        <Loader2 className="size-5 animate-spin text-primary" />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Processing {files.length} images...
                                </span>
                                <span className="font-medium">{globalProgress}%</span>
                            </div>
                            <Progress value={globalProgress} className="h-2" />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* File grid */}
            {hasFiles && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {files.length} image{files.length !== 1 && "s"} selected
                        </p>
                        {!isProcessing && !allProcessed && (
                            <Button variant="ghost" size="sm" onClick={reset}>
                                <X className="mr-1 size-4" />
                                Clear All
                            </Button>
                        )}
                    </div>

                    <motion.div
                        layout
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence>
                            {files.map((file) => (
                                <FileCard key={file.id} file={file} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}

            {/* Error alert */}
            {hasErrors && allProcessed && (
                <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>
                        Some images failed to process. Please try again.
                    </AlertDescription>
                </Alert>
            )}

            {/* Action buttons */}
            {hasFiles && (
                <div className="flex flex-wrap justify-center gap-3">
                    {!allProcessed && !isProcessing && (
                        <Button onClick={processAllImages} disabled={isProcessing}>
                            <Wand2 className="mr-2 size-4" />
                            Remove Background ({files.length})
                        </Button>
                    )}

                    {hasResults && allProcessed && (
                        <>
                            <Button onClick={handleDownloadAll}>
                                <Download className="mr-2 size-4" />
                                Download All
                            </Button>
                            <Button variant="outline" onClick={reset}>
                                <RotateCcw className="mr-2 size-4" />
                                Start Over
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
