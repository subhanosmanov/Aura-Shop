const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/category/createCategory');
const { deleteCategory } = require('../controllers/category/deleteCategory');
const { getCategories } = require('../controllers/category/getCategories');
const { getCategoryBySlug } = require('../controllers/category/getCategoryBySlug');

const verifyToken = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

router.post('/', verifyToken, verifyAdmin, createCategory);
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory);
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

module.exports = router;