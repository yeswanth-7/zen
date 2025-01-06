require('dotenv').config();
const mongoose = require('mongoose');
const Recommendation = require('./src/models/recommendationModel');
const fs = require('fs');

const seedRecommendations = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const rawData = fs.readFileSync('./src/seed/recommendations.json');
        const recommendationsToInsert = JSON.parse(rawData)
        await Recommendation.insertMany(recommendationsToInsert);
      console.log('Recommendations seeded successfully');
    } catch (error) {
        console.error('Error seeding recommendations data:', error);
     } finally {
       await mongoose.disconnect();
       console.log('Disconnected from MongoDB');
      }
  };
 seedRecommendations();