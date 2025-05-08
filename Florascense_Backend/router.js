const express = require('express');
const cors = require('cors');
const { getSearchedPlantList } = require('./controllers/getSearchedPlantsListController.js');
const { getPlantDetails } = require('./controllers/getPlantDetailsController.js');
const { generatePlantCareGuideWithName } = require('./controllers/getPlantCareGuideWithName.js');
const { generateCustomCareGuide } = require("./controllers/generateCustomCareGuideController.js")
const router = express.Router();

router.get('/getSearchedPlantList', getSearchedPlantList);
router.get('/getPlantDetails/:id', getPlantDetails);
router.post('/generatePlantCareGuide', 
    cors({ 
      origin: [process.env.FRONTEND_URL, 'https://florasense-frontend.vercel.app'],
      methods: ['POST', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Access-Control-Allow-Origin']
    }), 
    generatePlantCareGuideWithName
);

router.post(
    "/generateCustomCareGuide",
    cors({
      origin: [process.env.FRONTEND_URL, 'https://florasense-frontend.vercel.app'],
      methods: ['POST', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Access-Control-Allow-Origin']
    }),
    generateCustomCareGuide
);

module.exports = router;
