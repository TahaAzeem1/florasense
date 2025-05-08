import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generatePlantCareGuideWithName = async (req, res) => {
  try {
    const { plantName, scientificName } = req.body;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

     const prompt = `Create a detailed care guide for ${plantName} (${scientificName}). Include these sections with rich details:
     1. Watering Requirements:
     - Ideal watering frequency by season
     - Signs of overwatering/underwatering
     - Proper watering techniques
    
     2. Sunlight Needs:
     - Ideal light intensity
     - Daily sunlight duration
     - Window orientation recommendations
     - Signs of too much/too little light
    
     3. Location & Environment:
     - Temperature range preferences
     - Humidity requirements
     - Air circulation needs
     - Seasonal location adjustments
    
     4. Soil & Fertilization:
     - Ideal soil composition and a pH level recommendation
     - Fertilizer types and schedule
     - Repotting guidelines
    
     5. Pruning & Maintenance:
     - Proper pruning techniques
     - Pest prevention tips
     - Disease management
    
     6. Special Considerations:
     - Dormancy periods
     - Toxicity warnings
     - Seasonal care variations
     - Common troubleshooting tips
    
     Provide professional gardening advice in clear, concise points. Use metric and imperial units. Include pro tips from horticulturists.`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(content); // Stream the chunk directly
      }
    }

    res.end(); // Finalize response

  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate care guide',
      details: error.message
    });
  }
};
