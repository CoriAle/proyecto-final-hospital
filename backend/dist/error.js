"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
const express_validator_1 = require("express-validator");
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = 0;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (err, req, res) => {
    const { statusCode, message } = err;
    const errors = express_validator_1.validationResult(req);
    res.status(statusCode).json({
        status: err.name,
        statusCode,
        message,
        errors: !errors.isEmpty() ? errors.array() : null,
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map