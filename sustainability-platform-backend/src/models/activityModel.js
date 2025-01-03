const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  activityType: { type: String, required: true },
  value: Number,
  unit: String,
  activityDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);