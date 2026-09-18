const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty:{
                msg: 'Identification number can not be null'
            },
            len:{
                args: [8, 15],
                msg: 'Identification number must between 8 and 15 characters'
            }
        }
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Name can not be null'
            },
            len:{
                args: [1, 60],
                msg: 'Name must bebetween 1 and 60 characters'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Lastname can not be null'
            },
            len:{
                args: [1, 60],
                msg: 'Lastname must bebetween 1 and 60 characters'
            }
        }
    },
    email:{
        type: DataTypes.STRING(60),
        allowNull: false,
        unique:{
            msg: 'Email already exists'
        },
        validate: {
            isEmail:true,
            isEmail:{
                msg: 'Email format us invalid'
            },
            notEmpty:{
                msg: 'Email can not be empty'
            },
            len:{
                args: [5, 100],
                msg: 'Email must bebetween 5 and 100 characters'
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Password can not be empty'
            },
            len:{
                args: [8, 15],
                msg: 'Password must be at least 8 characters long'
            },
            isStrongPassword(value) {
                const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
                if (!strongPasswordRegex.test(value))
                    throw new Error('Password must include letters, numbers, and special characters');
              }
         }
    }
},{
    tableName: 'user',
    timestamps: true,
    paranoid: true,
})

module.exports = User
