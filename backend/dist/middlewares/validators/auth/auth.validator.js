"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validations = [
    express_validator_1.body('password').exists().withMessage('Password is required'),
    express_validator_1.body('email').exists().withMessage('Email is required'),
    express_validator_1.body('email').if(express_validator_1.body('email').exists()).isEmail().withMessage('Invalid Email Format')
];
exports.default = validations;
//# sourceMappingURL=auth.validator.js.map