const express = require('express');
const router = express.Router();

// PRODUCT CONTROLLER IMPORT;
const { createProduct } = require("../controllers/product/createProduct");
const { deleteProduct } = require("../controllers/product/deleteProduct");
const { getFilterProducts } = require("../controllers/product/getFilterProducts");
const { getProducts } = require("../controllers/product/getProducts");
const { getProductsByCategory } = require("../controllers/product/getProductsByCategory");
const { getProductsById } = require("../controllers/product/getProductsById");
const { searchProducts } = require("../controllers/product/searchProducts");

// COMMENT CONTROLLER IMPORT;
const { addComment } = require("../controllers/comment/addComment");
const { deleteComment } = require("../controllers/comment/deleteComment");
const { getCommentsByProduct } = require("../controllers/comment/getCommentsByProduct");

// MIDDLWARES IMPORT;
const verifyToken = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', verifyToken, verifyAdmin, upload.single('images'), createProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/filter', getFilterProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProductsById);

// Şərh yazmaq (Qeydiyyatdan keçənlər üçün - 'protect' middleware-i mütləqdir);
router.post('/:id/comments', verifyToken, addComment);

// Məhsulun şərhlərini görmək (Hər kəs görə bilər);
router.get('/:id/comments', getCommentsByProduct);

// Şərhi silmək (Admin və ya şərhi yazan şəxs);
router.delete('/:productId/comments/:commentId', verifyToken, deleteComment);
module.exports = router;