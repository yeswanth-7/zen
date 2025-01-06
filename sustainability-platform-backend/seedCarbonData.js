require('dotenv').config();
const mongoose = require('mongoose');
const CarbonData = require('./src/models/carbonModel');
const fs = require('fs');

const seedCarbonData = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI);
       console.log('Connected to MongoDB');

      const rawData = fs.readFileSync('./carbon_data.json');
       const carbonDataToInsert = JSON.parse(rawData)
      await CarbonData.insertMany(carbonDataToInsert);
     console.log('Carbon data seeded successfully');
    } catch (error) {
      console.error('Error seeding carbon data:', error);
    } finally {
      await mongoose.disconnect();
       console.log('Disconnected from MongoDB');
    }
};

  seedCarbonData();