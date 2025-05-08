const axios = require('axios');

const getSearchedPlantList = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiKey = "sk-8Tal67def248bd2d59346";
    const apiUrl = `https://perenual.com/api/v2/species-list?key=${apiKey}&q=${query}`;

    const response = await axios.get(apiUrl);
    
    // Format response: filter objects with id <= 3000 and ensure all have an id
    const formattedData = response.data.data
      .filter(plant => plant.id && plant.id <= 3000)
      .map(({ id, ...rest }) => ({ id, ...rest }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching plant data:", error.message);
    res.status(500).json({ error: "Failed to fetch plant data" });
  }
};

module.exports = { getSearchedPlantList };
