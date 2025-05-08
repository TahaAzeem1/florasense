"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Leaf, AlertCircle } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const PlantCareGuide = ({ plant, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [streamingContent, setStreamingContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    // Start streaming when component mounts
    startStreaming()

    // Cleanup function to abort any ongoing requests
    return () => {
      // If we had an AbortController, we would abort it here
    }
  }, [])

  const startStreaming = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setStreamingContent("")
      setIsComplete(false)
      setIsStreaming(true)

      // Get scientific name (handle array or string)
      const scientificName = Array.isArray(plant.scientific_name)
        ? plant.scientific_name[0]
        : plant.scientific_name || "Unknown"

      // Prepare the request to our backend API
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generatePlantCareGuide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantName: plant.common_name,
          scientificName: scientificName,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      // Get the response as a readable stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      setIsLoading(false)

      // Read the stream
      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          setIsComplete(true)
          setIsStreaming(false)
          break
        }

        // Decode the chunk and append to our content
        const chunk = decoder.decode(value, { stream: true })
        setStreamingContent((prev) => prev + chunk)

        // Scroll to bottom of content
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight
        }
      }
    } catch (err) {
      console.error("Error streaming plant care guide:", err)
      setError(err.message)
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-500 text-white">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Care Guide for {plant.common_name}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] prose prose-sm max-w-none">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <Leaf className="w-16 h-16 text-primary-500 animate-pulse" />
                <motion.div
                  className="absolute inset-0 border-4 border-primary-200 border-dashed rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
              <p className="mt-4 text-gray-600">Generating your personalized care guide...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 p-6 rounded-xl flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-700 mb-1">Error Generating Care Guide</h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={startStreaming}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div>
              {isStreaming && (
                <div className="fixed bottom-6 right-6 bg-primary-600 text-white px-4 py-2 rounded-full text-sm flex items-center">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 bg-white rounded-full mr-2"
                  />
                  Generating...
                </div>
              )}

              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-3 mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="my-2 ml-4 list-disc" {...props} />,
                  ol: ({node, ...props}) => <ol className="my-2 ml-4 list-decimal" {...props} />,
                  li: ({node, ...props}) => <li className="ml-4" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary-600 hover:underline" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-200 pl-4 my-2 italic" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? 
                      <code className="bg-gray-100 rounded px-1" {...props} /> :
                      <code className="block bg-gray-100 p-2 rounded" {...props} />
                }}
              >
                {streamingContent}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        {isComplete && (
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default PlantCareGuide

