const bikeService = require('../services/bikeService');

class BikeController {
    async getAll(req, res) {
        try {
            const bikes = await bikeService.getAll();
            res.json({ bikes });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving bikes', error: error.message });
        }
    }
}

module.exports = new BikeController();
