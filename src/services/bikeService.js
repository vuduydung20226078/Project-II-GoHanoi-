const { Bike, Brand } = require('../models');

class BikeService {
    async getAll(limit = 10) {
        try {
            const bikes = await Bike.findAll({
                include: [{ model: Brand }],
                limit
            });
            return bikes;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new BikeService();
