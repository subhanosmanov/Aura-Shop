const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const { addBasket } = require('../controllers/basket/addBasket');
const { getBasket } = require('../controllers/basket/getBasket');
const router = express.Router();

router.post("/", verifyToken, addBasket);
router.get("/:userId", verifyToken, getBasket);

module.exports = router;