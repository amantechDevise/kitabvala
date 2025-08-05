const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('payments', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        amount_paid: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '1=>shopPay,2=>credit_card, 3=>paypal, 4=>stripe, 5=>upi,	'
        },
        payment_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0=>pending,1=>success,2=>failed,3=>refunded	'
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },

    }, {
        sequelize,
        tableName: 'payments',
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
