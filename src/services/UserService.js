const BaseService = require('./BaseService');
const User = require('../models/User');

class UserService extends BaseService {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}

module.exports = new UserService();
