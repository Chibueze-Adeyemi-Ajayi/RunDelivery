class BaseController {
    constructor() {
    }

    sendResponse(res, code, message, data = null) {
        return res.status(code).json({
            status: code >= 200 && code < 300 ? 'success' : 'error',
            message,
            data,
        });
    }

    sendError(res, code, message, error = null) {
        return res.status(code).json({
            status: 'error',
            message,
            error: error ? error.message : null,
        });
    }
}

module.exports = BaseController;
