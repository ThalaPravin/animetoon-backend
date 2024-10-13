const express = require('express');
const { getAllWebtoons, getWebtoonById, addWebtoon, deleteWebtoon } = require('../controllers/webtoonController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllWebtoons);
router.get('/:id', getWebtoonById);
router.post('/', protect, addWebtoon);
router.delete('/:id', protect, deleteWebtoon);

module.exports = router;
