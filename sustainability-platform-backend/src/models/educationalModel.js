const mongoose = require('mongoose');

const educationalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('EducationalResource', educationalSchema);