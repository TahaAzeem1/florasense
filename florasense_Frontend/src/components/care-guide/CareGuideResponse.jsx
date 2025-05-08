"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Download, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import toast from "react-hot-toast"

const CareGuideResponse = ({ content, isComplete, responseRef, plantName }) => {
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight
    }
  }, [content, responseRef])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast.success("Care guide copied to clipboard!")
  }

  const handleDownloadPDF = () => {
    // This is a placeholder - in a real app, you'd implement PDF generation
    // For now, we'll just download as a text file
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${plantName || "Plant"} Care Guide.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Care guide downloaded!")
  }

  return (
    <div className="flex flex-col h-full max-h-[800px]">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="flex items-center">
          <Leaf className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-semibold">Your Custom Care Guide</h2>
        </div>
        {isComplete && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyToClipboard}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Download as PDF"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      <div
        ref={responseRef}
        className="flex-1 p-6 overflow-y-auto prose prose-sm max-w-none prose-headings:text-primary-800 prose-a:text-primary-600"
      >
        {!content ? (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Leaf className="w-12 h-12 text-primary-300" />
            </motion.div>
            <p className="mt-4 text-gray-500">Generating your care guide...</p>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2 text-primary-700" {...props} />,
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2 text-primary-600" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold mt-3 mb-1 text-primary-500" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-2 text-gray-700" {...props} />,
              ul: ({ node, ...props }) => <ul className="my-2 ml-4 list-disc text-gray-700" {...props} />,
              ol: ({ node, ...props }) => <ol className="my-2 ml-4 list-decimal text-gray-700" {...props} />,
              li: ({ node, ...props }) => <li className="ml-4" {...props} />,
              a: ({ node, ...props }) => <a className="text-primary-600 hover:underline" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-primary-200 pl-4 my-2 italic text-gray-600" {...props} />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code className="bg-primary-50 rounded px-1 text-primary-700" {...props} />
                ) : (
                  <code className="block bg-primary-50 p-2 rounded text-primary-700" {...props} />
                ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-4 py-2 bg-primary-50 text-left text-xs font-medium text-primary-700 uppercase tracking-wider"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}

        {!isComplete && content && (
          <div className="fixed bottom-6 right-6 bg-primary-600 text-white px-4 py-2 rounded-full text-sm flex items-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 bg-white rounded-full mr-2"
            />
            Generating...
          </div>
        )}
      </div>
    </div>
  )
}

export default CareGuideResponse
