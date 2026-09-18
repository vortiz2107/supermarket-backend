const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

class UserService {
    static async getAllUsers() {    
        return await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']]
        });
    }

    static async getUserById(id) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static async creatUser(userData) {
        const { idNumber, name, lastname, email } = userData;
        const existingUser = await User.findOne({where: {email}})

        if (existingUser) {
            throw new Error('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await User.create({
            idNumber,
            name,
            lastname,
            email,
            password: hashedPassword
        });

        const createdUser = user.toJSON();
        delete createdUser.password;

        return createdUser;
    }

    static async updateUser(id, userData) {
        const user = await User.findByPk(id)

        if (!user) {
            throw new Error('User not found');
        }

        const { idNumber, name, lastname, email } = userData;

        if(idNumber){
            const existingUser = await User.findOne({where: {idNumber}})
            if (existingUser){
                throw new Error('Identification number already exists')
            }
        }

        if(email){
            const existingUser = await User.findOne({where: {email}, userId: { [Op.ne]: id }})
            if (existingUser){
                throw new Error('Email already exists')
            }
        }
        
        const updateData = {idNumber, name, lastname, email};
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        await user.update(updateData)

        const updatedUser = user.toJSON()
        delete updateData.password

        return updatedUser

    }

    static async deleteUser(id){
        const user = await User.findByPk(id)

        if (!user){
            throw new Error ('User not found')
        }

        await user. destroy()
         return{message: 'User deleted succefully'}

    }

    static async login(email, password){
        const user = await User.findOne({where: {email}})

        if(!user){
            throw new Error('Invalid email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid email or password')
        }
        
        const loginUser = user.toJSON
        delete user.password
        
        return user
    }

}

module.exports = UserService


            