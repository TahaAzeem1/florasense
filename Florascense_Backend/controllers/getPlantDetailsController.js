const axios = require('axios');

const getPlantDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Plant ID is required" });
    }

    const apiKey = "sk-8Tal67def248bd2d59346";
    const apiUrl = `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`;

    const response = await axios.get(apiUrl);
    const { care_guides, hardiness_location, ...filteredData } = response.data; // we are filtering out care_guides and hardiness_location as they contains links with the api keys!
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching plant details:", error.message);
    res.status(500).json({ error: "Failed to fetch plant details" });
  }
};

module.exports = { getPlantDetails };
