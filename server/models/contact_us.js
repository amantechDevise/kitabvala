const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contact_us', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ""
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,

        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },


    }, {
        sequelize,
        tableName: 'contact_us',
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
