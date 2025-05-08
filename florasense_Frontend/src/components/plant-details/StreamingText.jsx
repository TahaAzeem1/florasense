"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const StreamingText = ({ content, formatText, isComplete }) => {
  const contentRef = useRef(null)

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [content])

  // Apply formatting to the content
  const formattedContent = formatText ? formatText(content) : content

  return (
    <motion.div
      ref={contentRef}
      className="prose prose-green max-w-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  )
}

export default StreamingText

