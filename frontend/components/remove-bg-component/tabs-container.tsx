"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SingleImageTab } from "./single-image-tab"
import { MultipleImagesTab } from "./multiple-images-tab"
import { ImageIcon, Images } from "lucide-react"
import { motion } from "framer-motion"

export function TabsContainer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <Tabs defaultValue="single" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                    <TabsTrigger value="single" className="gap-2">
                        <ImageIcon className="size-4" />
                        Single Image
                    </TabsTrigger>
                    <TabsTrigger value="multiple" className="gap-2">
                        <Images className="size-4" />
                        Multiple Images
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                    <SingleImageTab />
                </TabsContent>

                <TabsContent value="multiple">
                    <MultipleImagesTab />
                </TabsContent>
            </Tabs>
        </motion.div>
    )
}
