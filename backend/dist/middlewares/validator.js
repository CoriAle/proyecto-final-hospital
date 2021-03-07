"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const error_1 = require("../error");
const validationHandler = (req, res, next) => {
    //Validar errores en el request
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next(); //No hay errores entonces continuar al controller
    }
    const err = new error_1.ErrorHandler(400, 'Invalid field.');
    error_1.handleError(err, req, res);
};
exports.default = validationHandler;
//# sourceMappingURL=validator.js.map