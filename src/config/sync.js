const sequelize = require('./database');
require('../models/index');

class DatabaseSync {
    static async sync() {
        try {
            await sequelize.authenticate()
                .then(() => {
                    console.log('Database connection established successfully.')
                })
                .catch((error) => {
                    console.error('Unable to connect to the database:', error)
                })

            await sequelize.sync({ alter: true })
            console.log('Database synchronized successfully.')

        }catch (error) {
            console.log('Error synchronized the database:', error)

        }
    }
}

module.exports = DatabaseSync