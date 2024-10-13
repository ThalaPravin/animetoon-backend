const Webtoon = require('../models/webtoonModel');
const Joi = require('joi');

// Validation schema using Joi
const webtoonSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  characters: Joi.array().items(Joi.string()).required(),
});

// GET /webtoons - Fetch all webtoons
const getAllWebtoons = async (req, res) => {
  try {
    const webtoons = await Webtoon.find({});
    res.json(webtoons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /webtoons/:id - Fetch a specific webtoon by ID
const getWebtoonById = async (req, res) => {
  try {
    const webtoon = await Webtoon.findById(req.params.id);
    if (!webtoon) return res.status(404).json({ message: 'Webtoon not found' });
    res.json(webtoon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /webtoons - Add a new webtoon (JWT required)
const addWebtoon = async (req, res) => {
  try {
    const { error } = webtoonSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description, characters } = req.body;
    const newWebtoon = new Webtoon({ title, description, characters });
    await newWebtoon.save();
    res.status(201).json(newWebtoon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /webtoons/:id - Delete a webtoon by ID (JWT required)
const deleteWebtoon = async (req, res) => {
  try {
    const webtoon = await Webtoon.findById(req.params.id);
    if (!webtoon) return res.status(404).json({ message: 'Webtoon not found' });

    await webtoon.remove();
    res.json({ message: 'Webtoon deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllWebtoons, getWebtoonById, addWebtoon, deleteWebtoon };
