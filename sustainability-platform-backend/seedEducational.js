require('dotenv').config();
const mongoose = require('mongoose');
const EducationalResource = require('./src/models/educationalModel');
const fs = require('fs');

const seedEducational = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const rawData = fs.readFileSync('./src/seed/educational_resources.json');
    const educationalDataToInsert = JSON.parse(rawData);
    await EducationalResource.insertMany(educationalDataToInsert);

    console.log('Educational resources seeded successfully');
  } catch (error) {
    console.error('Error seeding educational resources data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedEducational();
