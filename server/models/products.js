const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('products', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        punjabi_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },

        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ""
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
         status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    }, {
        sequelize,
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};
