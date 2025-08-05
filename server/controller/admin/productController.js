const { Products, Categories, Rating, User, Product_Images } = require("../../models");
const { uploadImage } = require("../../utils/imageUplord");
const { multiImages } = require("../../utils/muliImage");


module.exports = {
  add_product: async (req, res) => {
    try {
      const {
        category_id,
        name,
        punjabi_name,
        price,
        stock,
        description,
      } = req.body;


      console.log(req.body);

      if (!category_id || !name || !price) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
      let imagePath = '';
      if (req.files && req.files.image) {
        imagePath = await uploadImage(req.files.image);
      }

      const newProduct = await Products.create({
        category_id,
        name,
        punjabi_name,
        price,
        image: imagePath || '',
        stock,
        description,
      });

      console.log(newProduct);

      return res.status(201).json({
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

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


  add_images: async (req, res) => {
    try {
      const { product_id } = req.body;
      const imageFiles = req.files?.images;


      if (!product_id) {
        return res.status(400).json({ message: 'product_id is required' });
      }

      if (!imageFiles) {
        return res.status(400).json({ message: 'No image files provided' });
      }

      // Upload images and get array of paths
      const uploadedPaths = await multiImages(imageFiles);

      // Store each image in the database
      const imageRecords = await Promise.all(uploadedPaths.map((path) => {
        return Product_Images.create({
          product_id,
          images: path
        });
      }));

      return res.status(200).json({
        message: 'Images uploaded and saved successfully',
        data: imageRecords
      });

    } catch (error) {
      console.error('Error uploading product images:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  get_images: async (req, res) => {
    try {
      const { product_id } = req.query;

      if (!product_id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const productImages = await Product_Images.findAll({
        where: { product_id },
        attributes: ["id", "images"],
        order: [["createdAt", "ASC"]],
      });

      if (!productImages || productImages.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No images found for this product",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product images fetched successfully",
        data: productImages,
        count: productImages.length,
      });

    } catch (error) {
      console.error("Error fetching product images:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

    delete_images: async (req, res) => {
    try {
      const { id } = req.params;

      const img = await Product_Images.findByPk(id);
      if (!img) {
        return res.status(404).json({ message: "Images not found" });
      }

      await img.destroy(); // Soft delete because of paranoid: true

      return res.status(200).json({ message: "Images deleted successfully" });
    } catch (error) {
      console.error("Error deleting Images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  product_details: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id, {
        include: [
          {
            model: Categories,
            as: 'category',
          },
          {
            model: Rating,
            as: 'ratings',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
              },
            ],
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json({
        message: 'Product details fetched successfully',
        data: product,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  update_status: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (typeof status === "undefined") {
        return res.status(400).json({ message: "Status is required" });
      }

      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }


      product.status = status;
      await product.save();

      return res.status(200).json({
        message: "Product status updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  update_product: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        category_id,
        name,
        punjabi_name,
        price,
        image,
        stock,
        description,
      } = req.body;

      const product = await Products.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.update({
        category_id,
        name,
        punjabi_name,
        price,
        image,
        stock,
        description,
      });

      return res.status(200).json({
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  delete_product: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy(); // Soft delete because of paranoid: true

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },


  // ......................Order APis >>>>>>>>>>>>>>>>>>>>>>>>>>




};
