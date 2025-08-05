const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ratings', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }

        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
     
    }, {
        sequelize,
        tableName: 'ratings',
        timestamps: true,
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
