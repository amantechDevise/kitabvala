const { Categories } = require("../../models");



module.exports = {

  listing: async (req, res) => {
    try {

      const newCategory = await Categories.findAll();
      return res.status(201).json({
        message: 'Get All Categories ',
        data: newCategory
      });
    } catch (error) {
      console.error('Error creating category:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  // In your controller file

update_status: async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status === "undefined") {
      return res.status(400).json({ message: "Status is required" });
    }

    const category = await Categories.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log(category);
    
    category.status = status;
    await category.save();

    return res.status(200).json({
      message: "Category status updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
,  add_cate: async (req, res) => {
    try {

      const { name } = req.body
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const newCategory = await Categories.create({ name });
      return res.status(201).json({
        message: 'Category created successfully',
        data: newCategory
      });
    } catch (error) {
      console.error('Error creating category:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  // ✅ Update Category
  update_cate: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      const category = await Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (name !== undefined) category.name = name;
      if (status !== undefined) category.status = status;

      await category.save();

      return res.status(200).json({
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // ✅ Delete Category
  delete_cate: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.destroy();

      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
}