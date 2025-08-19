const { Op } = require("sequelize");
const { Favorite, CartItems, Products, Rating, Categories } = require("../../models");

module.exports = {
  home_listing: async (req, res) => {
    try {
      const { sortBy, minPrice, maxPrice, limit = 10 } = req.query;

      let order = [['createdAt', 'DESC']];

      // Sorting options
      switch (sortBy) {
        case 'date_new_to_old':
          order = [['createdAt', 'DESC']];
          break;
        case 'date_old_to_new':
          order = [['createdAt', 'ASC']];
          break;
        case 'name_a_to_z':
          order = [['name', 'ASC']];
          break;
        case 'name_z_to_a':
          order = [['name', 'DESC']];
          break;
        case 'price_low_to_high':
          order = [['price', 'ASC']];
          break;
        case 'price_high_to_low':
          order = [['price', 'DESC']];
          break;
      }

      // Price filter condition
      let whereCondition = {};

      if (minPrice || maxPrice) {
        whereCondition.price = {};
        if (minPrice) {
          whereCondition.price[Op.gte] = parseFloat(minPrice);
        }
        if (maxPrice) {
          whereCondition.price[Op.lte] = parseFloat(maxPrice);
        }
      }

            // Pagination calculation
      const limitCount = parseInt(limit);

      // Get filtered & sorted product listing
       const productList = await Products.findAll({
        where: whereCondition,
        order,
           limit: limitCount,
      });
       // Count of filtered products
      const filteredProductCount = await Products.count({
        where: whereCondition
      });
      // Wishlist & Cart Count
      const wishListCount = await Favorite.count();
      const cartItemCount = await CartItems.count();

      res.status(200).json({
        success: true,
        data: {
          productList,
          filteredProductCount,
          wishListCount,
          cartItemCount
        }
      });
    } catch (error) {
      console.error("Error in home_listing:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
        error: error.message
      });
    }
  },
  addRatings: async (req, res) => {
  try {
    const { user_id, product_id, rating, review } = req.body;

 
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const existingRating = await Rating.findOne({
      where: { user_id, product_id }
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review || existingRating.review;
      await existingRating.save();
      return res.status(200).json({ message: 'Rating updated successfully', data: existingRating });
    }

    // ✅ Create new rating
    const newRating = await Rating.create({
      user_id,
      product_id,
      rating,
      review
    });

    return res.status(201).json({ message: 'Rating added successfully', data: newRating });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

    list_ProductsAll: async (req, res) => {
    try {
        const products = await Products.findAll({
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
            order: [['createdAt', 'DESC']] 
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
};
