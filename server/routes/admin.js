var express = require('express');
const authController = require('../controller/admin/authController');
const CategoryController = require('../controller/admin/CategoryController');
const productController = require('../controller/admin/productController');
const authenticateToken = require('../middleware/verifyToken');
var router = express.Router();

router.post('/adminLogin', authController.Adminlogin)
/* GET users listing. */
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/dashboard',authenticateToken, authController.dashboard)

// =================Users Routes==================
router.get('/user', authenticateToken, authController.allUser);
router.get('/user/:id', authController.getUserById);


router.get('/contact_us', authenticateToken, authController.contactList);
// =================Categories Routes==================
router.get('/category',authenticateToken, CategoryController.listing)
router.patch('/category/:id/status', authenticateToken, CategoryController.update_status);

router.post('/category/add',authenticateToken, CategoryController.add_cate)
router.put("/category/update/:id",authenticateToken, CategoryController.update_cate);
router.delete("/category/delete/:id",authenticateToken, CategoryController.delete_cate);


// =================Products Routes==================

router.get('/products',authenticateToken, productController.list_products)
router.post('/products/add',authenticateToken, productController.add_product)
router.get('/get_images',authenticateToken, productController.get_images)
router.post('/add_images',authenticateToken, productController.add_images)
router.delete('/delete_image/:id',authenticateToken, productController.delete_images)
router.put("/products/update/:id",authenticateToken, productController.update_product);
router.get("/products/details/:id",authenticateToken, productController.product_details);
router.delete("/products/delete/:id",authenticateToken, productController.delete_product);


// =================Orders Routes==================

module.exports = router;
