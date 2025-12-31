const BaseController = require('./BaseController');
const userService = require('../services/UserService');

class UserController extends BaseController {
    constructor() {
        super();
        this.userService = userService;
    }

    createUser = async (req, res) => {
        try {
            const user = await this.userService.create(req.body);
            return this.sendResponse(res, 201, 'User created successfully', user);
        } catch (error) {
            return this.sendError(res, 400, 'Error creating user', error);
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.findAll();
            return this.sendResponse(res, 200, 'Users retrieved successfully', users);
        } catch (error) {
            return this.sendError(res, 500, 'Error retrieving users', error);
        }
    }

    getUserById = async (req, res) => {
        try {
            const user = await this.userService.findById(req.params.id);
            if (!user) {
                return this.sendError(res, 404, 'User not found');
            }
            return this.sendResponse(res, 200, 'User retrieved successfully', user);
        } catch (error) {
            return this.sendError(res, 500, 'Error retrieving user', error);
        }
    }
}

module.exports = new UserController();
