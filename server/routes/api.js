var express = require('express');
const productController = require('../controller/api/productController');
const ContactController = require('../controller/api/ContactController');
const homeController = require('../controller/api/homeController');

var apiRouter = express.Router();

// =================Home Routes==================
apiRouter.get('/home', homeController.home_listing)
apiRouter.get('/getAll', homeController.list_ProductsAll)

// =================Contact us Routes==================
apiRouter.post('/contact', ContactController.contactAdd)
// =================Categories Routes==================
apiRouter.get('/category', productController.listing_cate)
apiRouter.get('/products', productController.list_products)
apiRouter.get('/products', productController.list_products)
apiRouter.get('/products/details/:id', productController.productDetails)
apiRouter.get('/categories/:id', productController.getProductsByCategory)
apiRouter.get('/items', productController.getItems)
apiRouter.post('/add/cart', productController.addToCart)
apiRouter.delete('/cart/remove', productController.deleteCart);
apiRouter.post('/add/wishList', productController.addtoWishList)
apiRouter.post('/add-order', productController.add_Oder)


apiRouter.post('/rating', homeController.addRatings);
// =================Orders Routes==================

module.exports = apiRouter;
