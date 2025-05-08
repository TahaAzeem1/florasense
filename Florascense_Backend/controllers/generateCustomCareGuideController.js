// import OpenAI from "openai"
// import dotenv from "dotenv"
// dotenv.config()

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export const generateCustomCareGuide = async (req, res) => {
//   try {
//     const {
//       plantName,
//       plantType,
//       growingEnvironment,
//       lightCondition,
//       wateringFrequency,
//       temperature,
//       humidity,
//       region,
//       specificConcerns,
//       experienceLevel,
//     } = req.body

//     if (!plantName || !plantType) {
//       return res.status(400).json({ error: "Plant name and type are required" })
//     }

//     res.setHeader("Content-Type", "text/plain; charset=utf-8")
//     res.setHeader("Transfer-Encoding", "chunked")
//     res.setHeader("Cache-Control", "no-cache")

//     // Build a detailed prompt based on the user's input
//     const prompt = `Create a detailed care guide for ${plantName} (${plantType}). The plant is grown ${growingEnvironment}${
//       region ? ` in a ${region} climate` : ""
//     }.

//     Include these sections with rich details:
     
//      1. Light Requirements:
//      - Current condition: ${lightCondition || "Not specified"}
//      - Ideal light intensity and duration
//      - Window orientation recommendations
//      - Signs of too much/too little light
//      - Seasonal light adjustments
    
//      2. Watering Needs:
//      - Current watering frequency: ${wateringFrequency || "Not specified"}
//      - Ideal watering schedule by season
//      - Signs of overwatering/underwatering
//      - Proper watering techniques
//      - Water quality considerations
    
//      3. Environment & Climate:
//      - Temperature needs: ${temperature || "Not specified"}
//      - Humidity requirements: ${humidity || "Not specified"}
//      - Air circulation needs
//      - Seasonal adjustments
    
//      4. Soil & Nutrition:
//      - Ideal soil composition and pH
//      - Fertilizer types and schedule
//      - Repotting guidelines and frequency
    
//      5. Pruning & Maintenance:
//      - Proper pruning techniques and timing
//      - Cleaning and maintenance tips
//      - Growth habit management
    
//      6. Troubleshooting:
//      ${specificConcerns ? `- Addressing specific concerns: ${specificConcerns}` : "- Common issues and solutions"}
//      - Pest prevention and treatment
//      - Disease identification and management
    
//      7. Special Care Tips:
//      - Seasonal care variations
//      - Propagation methods
//      - Pet safety considerations
//      - Expert tips for ${experienceLevel} plant parents
    
//      Provide professional gardening advice in clear, concise points. Use both metric and imperial units where appropriate. Include pro tips from horticulturists. Format the response with markdown for readability.`

//     try {
//       const stream = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         stream: true,
//       })

//       for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content
//         if (content) {
//           res.write(content) // Stream the chunk directly
//         }
//       }

//       res.end() // Finalize response
//     } catch (error) {
//       console.error("OpenAI API error:", error)
//       res.status(500).json({
//         error: "Failed to generate care guide",
//         details: error.message,
//       })
//     }
//   } catch (error) {
//     console.error("Server error:", error)
//     res.status(500).json({
//       error: "Failed to process request",
//       details: error.message,
//     })
//   }
// }


import OpenAI from "openai"
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateCustomCareGuide = async (req, res) => {
  try {
    const {
      plantName,
      plantType,
      growingEnvironment,
      lightCondition,
      wateringFrequency,
      temperature,
      humidity,
      region,
      specificConcerns,
      experienceLevel,
    } = req.body

    if (!plantName) {
      return res.status(400).json({ error: "Plant name is required" })
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.setHeader("Transfer-Encoding", "chunked")
    res.setHeader("Cache-Control", "no-cache")

    // Build a detailed prompt based on the user's input
    const plantIdentifier = plantType ? `${plantName} (${plantType})` : plantName

    const prompt = `Create a detailed care guide for ${plantIdentifier}. The plant is grown ${growingEnvironment}${
      region ? ` in a ${region} climate` : ""
    }.

    Include these sections with rich details:
     
     1. Light Requirements:
     - Current condition: ${lightCondition || "Not specified"}
     - Ideal light intensity and duration
     - Window orientation recommendations
     - Signs of too much/too little light
     - Seasonal light adjustments
    
     2. Watering Needs:
     - Current watering frequency: ${wateringFrequency || "Not specified"}
     - Ideal watering schedule by season
     - Signs of overwatering/underwatering
     - Proper watering techniques
     - Water quality considerations
    
     3. Environment & Climate:
     - Temperature needs: ${temperature || "Not specified"}
     - Humidity requirements: ${humidity || "Not specified"}
     - Air circulation needs
     - Seasonal adjustments
    
     4. Soil & Nutrition:
     - Ideal soil composition and pH
     - Fertilizer types and schedule
     - Repotting guidelines and frequency
    
     5. Pruning & Maintenance:
     - Proper pruning techniques and timing
     - Cleaning and maintenance tips
     - Growth habit management
    
     6. Troubleshooting:
     ${specificConcerns ? `- Addressing specific concerns: ${specificConcerns}` : "- Common issues and solutions"}
     - Pest prevention and treatment
     - Disease identification and management
    
     7. Special Care Tips:
     - Seasonal care variations
     - Propagation methods
     - Pet safety considerations
     - Expert tips for ${experienceLevel} plant parents
    
     Provide professional gardening advice in clear, concise points. Use both metric and imperial units where appropriate. Include pro tips from horticulturists. Format the response with markdown for readability.`

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        stream: true,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          res.write(content) // Stream the chunk directly
        }
      }

      res.end() // Finalize response
    } catch (error) {
      console.error("OpenAI API error:", error)
      res.status(500).json({
        error: "Failed to generate care guide",
        details: error.message,
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    res.status(500).json({
      error: "Failed to process request",
      details: error.message,
    })
  }
}
