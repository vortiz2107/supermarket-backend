const sequelize = require('../config/database');
const User = require('./user.models');
const Product = require('./product.model');
const Sale = require('./sale.model');
const SaleProduct = require('./saleProduct.model');

User.hasMany(Sale,{ 
    foreignKey: 'userId',
    as: 'sales',
    onDelete: 'RESTRICT',
    onupdate: 'CASCADE'
})

Sale.belongsTo(User,{
    foreignKey: 'userId',
    as: 'user',
})

Sale.hasMany(SaleProduct,{
    foreignKey: 'saleId',
    as: 'saleProducts',
    onDelete: 'RESTRICT',
    onupdate: 'CASCADE'
})

SaleProduct.belongsTo(Sale,{
    foreignKey: 'saleId',
    as: 'sale',
})

Product.hasMany(SaleProduct,{
    foreignKey: 'productId',
    as: 'saleProducts',
    onDelete: 'RESTRICT',
    onupdate: 'CASCADE'
})

SaleProduct.belongsTo(Product,{
    foreignKey: 'productId',
    as: 'product',
})

module.exports = {
    sequelize,
    User,
    Product,
    Sale,
    SaleProduct
}