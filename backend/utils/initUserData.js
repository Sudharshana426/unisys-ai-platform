// This file previously initialized user-specific data. Now, it initializes global data if needed.

const Achievement = require('../models/Achievement');
const Todo = require('../models/Todo');
const Certification = require('../models/Certification');

async function initGlobalData() {
  // Example: Ensure at least one achievement exists
  const existingAchievement = await Achievement.findOne();
  if (!existingAchievement) {
    await Achievement.create({
      type: 'hackathon',
      name: 'Sample Hackathon',
      date: '2024-01-01',
    });
  }
  // Similar logic can be added for Todo and Certification if needed
}

module.exports = { initGlobalData }; 