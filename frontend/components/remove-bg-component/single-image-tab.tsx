"use client"

import { useState, useCallback } from "react"
import { UploadArea } from "./upload-area"
import { ImagePreview } from "./image-preview"
import { ResultPreview } from "./result-preview"
import { ProcessingState } from "./processing-state"
import { Button } from "@/components/ui/button"
import { useRemoveBg } from "@/hooks/use-remove-bg"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, RotateCcw, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SingleImageTab() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { isLoading, progress, error, result, processImage, reset } = useRemoveBg()

    const handleFileSelected = useCallback((files: File[]) => {
        if (files.length > 0) {
            const file = files[0]
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
            reset()
        }
    }, [reset])

    const handleRemoveImage = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        setSelectedFile(null)
        setPreviewUrl(null)
        reset()
    }, [previewUrl, reset])

    const handleProcess = useCallback(() => {
        if (selectedFile) {
            processImage(selectedFile)
        }
    }, [selectedFile, processImage])

    const handleStartOver = useCallback(() => {
        handleRemoveImage()
    }, [handleRemoveImage])

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {!selectedFile && !result && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <UploadArea onFilesSelected={handleFileSelected} multiple={false} />
                    </motion.div>
                )}

                {selectedFile && !isLoading && !result && (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="mx-auto max-w-xs">
                            <ImagePreview
                                src={previewUrl! || "/placeholder.svg"}
                                filename={selectedFile.name}
                                onRemove={handleRemoveImage}
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="size-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex justify-center gap-3">
                            <Button variant="outline" onClick={handleRemoveImage}>
                                <RotateCcw className="mr-2 size-4" />
                                Change Image
                            </Button>
                            <Button onClick={handleProcess}>
                                <Wand2 className="mr-2 size-4" />
                                Remove Background
                            </Button>
                        </div>
                    </motion.div>
                )}

                {isLoading && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ProcessingState progress={progress} />
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <ResultPreview
                            original={result.original}
                            processed={result.processed}
                            filename={result.filename}
                        />

                        <div className="flex justify-center">
                            <Button variant="outline" onClick={handleStartOver}>
                                <RotateCcw className="mr-2 size-4" />
                                Process Another Image
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
