'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all models from this directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Call associate() if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Manually load models
db.User = require("./user")(sequelize, Sequelize);
db.Categories = require("./categories")(sequelize, Sequelize);
db.Products = require("./products")(sequelize, Sequelize);
db.Orders = require("./orders")(sequelize, Sequelize);
db.OrderItems = require("./order_items")(sequelize, Sequelize);
db.CartItems = require("./cart_items")(sequelize, Sequelize);
db.Address = require("./addresses")(sequelize, Sequelize);
db.Favorite = require("./favorites")(sequelize, Sequelize);
db.ContactUs = require("./contact_us")(sequelize, Sequelize);
db.Payments = require("./payments")(sequelize, Sequelize);
db.Rating = require("./ratings")(sequelize, Sequelize);
db.Product_Images = require("./productimages")(sequelize, Sequelize);

// Relationships
db.Products.hasMany(db.Product_Images, {
  foreignKey: 'product_id',
  as: 'images'
});

// Each image belongs to one product
db.Product_Images.belongsTo(db.Products, {
  foreignKey: 'product_id',
  as: 'product'
});
// Category → Products
db.Categories.hasMany(db.Products, {
  foreignKey: 'category_id',
  as: 'products'
});
db.Products.belongsTo(db.Categories, {
  foreignKey: 'category_id',
  as: 'category'
});

// User → Orders
db.User.hasMany(db.Orders, {
  foreignKey: 'user_id',
  as: 'orders'
});
db.Orders.belongsTo(db.User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Orders → OrderItems
db.Orders.hasMany(db.OrderItems, {
  foreignKey: 'order_id',
  as: 'order_items'
});
db.OrderItems.belongsTo(db.Orders, {
  foreignKey: 'order_id',
  as: 'order'
});

// OrderItems → Products
db.OrderItems.belongsTo(db.Products, {
  foreignKey: 'product_id',
  as: 'product'
});
db.Products.hasMany(db.OrderItems, {
  foreignKey: 'product_id',
  as: 'order_items'
});

// User → CartItems (optional)
db.User.hasMany(db.CartItems, {
  foreignKey: 'user_id',
  as: 'cart_items'
});
db.CartItems.belongsTo(db.User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Product → CartItems
db.Products.hasMany(db.CartItems, {
  foreignKey: 'product_id',
  as: 'cart_items'
});
db.CartItems.belongsTo(db.Products, {
  foreignKey: 'product_id',
  as: 'product'
});

// User → Address
db.User.hasMany(db.Address, {
  foreignKey: 'user_id',
  as: 'addresses'
});
db.Address.belongsTo(db.User, {
  foreignKey: 'user_id',
  as: 'user'
});

db.Products.hasMany(db.Favorite, {
    foreignKey: "product_id",
    as: "favorites"
});

// User has many favorites
db.User.hasMany(db.Favorite, {
    foreignKey: "user_id",
    as: "favorites"
});

// Favorite belongs to Product
db.Favorite.belongsTo(db.Products, {
    foreignKey: "product_id",
    as: "product"
});

// Favorite belongs to User
db.Favorite.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user"
});


// In orders model
db.Orders.hasMany(db.Payments, { foreignKey: 'order_id',as: "pay" });

// In Payments model
db.Payments.belongsTo(db.Orders, { foreignKey: 'order_id',as: "order" });


// User → Ratings (one-to-many)
db.User.hasMany(db.Rating, { foreignKey: 'user_id', as: 'ratings' });

// Product → Ratings (one-to-many)
db.Products.hasMany(db.Rating, { foreignKey: 'product_id', as: 'ratings' });

// Rating → User (belongsTo)
db.Rating.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

// Rating → Product (belongsTo)
db.Rating.belongsTo(db.Products, { foreignKey: 'product_id', as: 'product' });
module.exports = db;
