const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Sale = sequelize.define('sale', {
    saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    saleDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: { 
            isDate: {
                msg: 'Sale date must be a valid date'
            }
        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        dafaultValue: 0.00,
        validate: {
            min: {
                args: [0.00],
                msg: 'Total amount must be a positive number'
            }
        }
    }

},{
    tableName: 'sale',
    timestamps: true,
    paranoid: true
})

module.exports = Sale;
