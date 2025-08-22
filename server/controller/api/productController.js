const { Products, Categories, CartItems, Favorite, Orders, OrderItems, sequelize, Rating, Product_Images } = require("../../models");


module.exports = {

    // ✅ Get Category
    listing_cate: async (req, res) => {
        try {

            const newCategory = await Categories.findAll({
                // include: [
                //     {
                //         model: Products,
                //         as: 'products',
                //     }
                // ]
            });
            return res.status(201).json({
                message: 'Get All Categories ',
                data: newCategory
            });
        } catch (error) {
            console.error('Error creating category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // ✅ Get Products
    list_products: async (req, res) => {
        try {
            const products = await Products.findAll({
                include: [
                    {
                        model: Categories,
                        as: 'category',
                    }
                ]
            });

            return res.status(200).json({
                message: 'All products fetched successfully',
                data: products,
            });
        } catch (error) {
            console.error('Error listing products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // ✅ getProductsByCategory
    getProductsByCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;

            const products = await Products.findAll({
                where: { category_id: categoryId },
                include: [
                    {
                        model: Categories,
                        as: 'category',
                    },
                    {
                        model: Rating,
                        as: 'ratings',
                    },
                ],
            });

            // Add average rating and review count
            const productsWithRatings = products.map(product => {
                const ratings = product.ratings || [];
                const total = ratings.reduce((sum, r) => sum + r.rating, 0);
                const average = ratings.length > 0 ? total / ratings.length : 0;

                return {
                    ...product.toJSON(),
                    rating: average.toFixed(1),
                    reviews: ratings.length,
                };
            });

            return res.status(200).json({
                message: `Products for category ID ${categoryId}`,
                data: productsWithRatings,
            });
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },


    getItems: async (req, res) => {
        try {
            const { user_id } = req.query;
            if (!user_id) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const cartItems = await CartItems.findAll({
                where: { user_id },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        include: [
                            {
                                model: Product_Images,
                                as: 'images',
                            },
                            {
                                model: Rating,
                                as: 'ratings',
                            }
                        ]
                    }
                ]
            });
            return res.status(200).json({
                message: 'Cart items fetched successfully',
                data: cartItems
            });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },


  productDetails: async (req, res) => {
    try {
        const { id } = req.params;

        const getProduct = await Products.findOne({
            where: { id },
            include: [
                {
                    model: Product_Images,
                    as: 'images',
                },
                {
                    model: Rating,
                    as: 'ratings',
                },
                { model: Favorite, as: 'favorites' },
                { model: CartItems, as: 'cart_items' }
            ]
        });

        if (!getProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
         

        return res.status(200).json({
            message: 'Product details fetched successfully',
            data: getProduct
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
},

    // ✅ Add Product to Cart
    addToCart: async (req, res) => {
        try {
            const { user_id, product_id, quantity } = req.body;
            const io = req.io;

            if (!product_id) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            const existingItem = await CartItems.findOne({
                where: { product_id }
            });

            const qty = parseInt(quantity) || 1;

            if (existingItem) {
                existingItem.quantity += qty;
                await existingItem.save();

                // Emit cart update to all clients
                io.emit('cart:update', {
                    action: 'update',
                    userId: user_id,
                    item: existingItem
                });

                return res.status(200).json({
                    message: 'Cart updated successfully',
                    data: existingItem
                });
            } else {
                const newCartItem = await CartItems.create({
                    user_id,
                    product_id,
                    quantity: qty
                });

                // Emit cart add to all clients
                io.emit('cart:add', {
                    action: 'add',
                    userId: user_id,
                    item: newCartItem
                });

                return res.status(201).json({
                    message: 'Product added to cart',
                    data: newCartItem
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const { product_id, user_id } = req.body;
            const io = req.io;

            const deleted = await CartItems.destroy({
                where: { product_id }
            });

            if (deleted === 0) {
                return res.status(404).json({ message: "Item not found in cart" });
            }

            // Emit cart remove to all clients
            io.emit('cart:remove', {
                action: 'remove',
                userId: user_id,
                productId: product_id
            });

            return res.status(200).json({
                message: "Item removed from cart successfully"
            });
        } catch (error) {
            console.error('Error removing from cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getWishlistItems: async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const items = await Favorite.findAll({
      where: { user_id },
      attributes: ['product_id'],
    });

    return res.status(200).json({
      message: 'Wishlist items fetched successfully',
      data: items,
    });
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

    addtoWishList: async (req, res) => {
        try {
            const { user_id, product_id } = req.body;
            const io = req.io;

            if (!product_id) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            const existingItem = await Favorite.findOne({
                where: { product_id }
            });

            if (existingItem) {
                await existingItem.destroy();

                // Emit wishlist remove
                io.emit('wishlist:update', {
                    action: 'remove',
                    userId: user_id,
                    productId: product_id
                });

                return res.status(200).json({
                    message: 'Product removed from WishList',
                    removed: true
                });
            } else {
                const newCartItem = await Favorite.create({
                    user_id,
                    product_id,
                });

                // Emit wishlist add
                io.emit('wishlist:update', {
                    action: 'add',
                    userId: user_id,
                    item: newCartItem
                });

                return res.status(201).json({
                    message: 'Product added to WishList',
                    data: newCartItem,
                    removed: false
                });
            }
        } catch (error) {
            console.error('Error toggling WishList item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    add_Oder: async (req, res) => {
        const { user_id, items } = req.body;

        // ✅ Check input
        if (!user_id || !items || typeof items !== 'object') {
            return res.status(400).json({ message: 'user_id and items are required' });
        }

        // ✅ Normalize to array
        const normalizedItems = Array.isArray(items) ? items : [items];

        if (normalizedItems.length === 0) {
            return res.status(400).json({ message: 'At least one item is required' });
        }

        const transaction = await sequelize.transaction();

        try {
            let totalAmount = 0;

            // ✅ Step 1: Calculate total amount
            for (const item of normalizedItems) {
                const product = await Products.findByPk(item.product_id);

                if (!product) {
                    await transaction.rollback();
                    return res.status(404).json({ message: `Product not found: ID ${item.product_id}` });
                }

                totalAmount += parseFloat(product.price) * item.quantity;
            }

            // ✅ Step 2: Create the order
            const order = await Orders.create(
                {
                    user_id,
                    total_amount: totalAmount,
                    status: 1, // pending
                },
                { transaction }
            );

            // ✅ Step 3: Insert order items
            for (const item of normalizedItems) {
                const product = await Products.findByPk(item.product_id);

                await OrderItems.create(
                    {
                        order_id: order.id,
                        product_id: product.id,
                        quantity: item.quantity,
                        price: product.price,
                    },
                    { transaction }
                );

                // ✅ Optional: update stock
                // product.stock -= item.quantity;
                // await product.save({ transaction });
            }

            // ✅ Step 4: Commit transaction
            await transaction.commit();

            return res.status(201).json({
                message: 'Order created successfully',
                order_id: order.id,
                total_amount: totalAmount,
            });

        } catch (error) {
            await transaction.rollback();
            console.error('Error creating order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}