const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authMiddleware');
const { addFavorite } = require('../controllers/wishlist/addFavorite');
const { getFavorite } = require('../controllers/wishlist/getFavorite');

router.post("/", verifyToken, addFavorite);
router.get("/", verifyToken, getFavorite);

module.exports = router;