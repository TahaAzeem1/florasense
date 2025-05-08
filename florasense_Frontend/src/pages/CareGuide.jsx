"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, ArrowLeft, Sparkles, TreesIcon as Plant, Droplet, Sun, HelpCircle } from "lucide-react"
import CareGuideForm from "../components/care-guide/CareGuideForm"
import CareGuideResponse from "../components/care-guide/CareGuideResponse"
import { useNavigate } from "react-router-dom"

const CareGuide = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState(null)
  const responseRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setStreamingContent("")
      setIsComplete(false)
      setFormData(data)

      // Prepare the request to our backend API
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generateCustomCareGuide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      // Get the response as a readable stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Read the stream
      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          setIsComplete(true)
          setIsSubmitting(false)
          break
        }

        // Decode the chunk and append to our content
        const chunk = decoder.decode(value, { stream: true })
        setStreamingContent((prev) => prev + chunk)

        // Scroll to bottom of content
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight
        }
      }
    } catch (error) {
      console.error("Error generating care guide:", error)
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setStreamingContent("")
    setIsComplete(false)
    setFormData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Custom Care Guide
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                className="ml-3"
              >
                <Sparkles className="h-6 w-6 text-primary-500" />
              </motion.div>
            </h1>
          </div>
        </motion.div>

        {/* Floating icons for decoration */}
        <div className="absolute top-20 right-10 opacity-10 hidden lg:block">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Plant className="h-32 w-32 text-primary-400" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 left-10 opacity-10 hidden lg:block">
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Leaf className="h-24 w-24 text-primary-400" />
          </motion.div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Form or summary */}
          <AnimatePresence mode="wait">
            {!streamingContent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary-500" />
                    Tell us about your plant
                  </h2>
                </div>

                <CareGuideForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Plant className="mr-2 h-5 w-5 text-primary-500" />
                    Your Plant Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-primary-800">Plant Name</h3>
                      </div>
                      <p className="text-gray-700">{formData?.plantName}</p>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Plant className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-primary-800">Plant Type</h3>
                      </div>
                      <p className="text-gray-700">{formData?.plantType}</p>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sun className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-primary-800">Light Conditions</h3>
                      </div>
                      <p className="text-gray-700">{formData?.lightCondition}</p>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Droplet className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-primary-800">Watering Frequency</h3>
                      </div>
                      <p className="text-gray-700">{formData?.wateringFrequency}</p>
                    </div>
                  </div>

                  {formData?.specificConcerns && (
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HelpCircle className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-primary-800">Specific Concerns</h3>
                      </div>
                      <p className="text-gray-700">{formData?.specificConcerns}</p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right column - Response */}
          <AnimatePresence>
            {streamingContent && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <CareGuideResponse
                  content={streamingContent}
                  isComplete={isComplete}
                  responseRef={responseRef}
                  plantName={formData?.plantName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CareGuide
