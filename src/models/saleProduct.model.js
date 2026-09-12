const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const SaleProduct = sequelize.define('saleProduct', {
    saleProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { 
            min: {
                args: [1],
                msg: 'Quantity must be a positive number'
            }
        }
    },
},{
    tableName: 'saleProduct',
    timestamps: true,
    paranoid: true
})

module.exports = SaleProduct;