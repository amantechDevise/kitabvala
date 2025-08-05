const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('addresses', {
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
        address_line: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ""
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        postal_code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },

    }, {
        sequelize,
        tableName: 'addresses',
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
