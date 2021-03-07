"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validations = [
    express_validator_1.body('password').exists().withMessage('Password is required'),
    express_validator_1.body('email').exists().withMessage('Email is required'),
    express_validator_1.body('name').exists().withMessage('Name is required'),
    express_validator_1.body('name').if(express_validator_1.body('email').exists()).isLength({ min: 3 }).withMessage('Name is required'),
    express_validator_1.body('email').if(express_validator_1.body('email').exists()).isEmail().withMessage('Invalid Email Format'),
];
exports.default = validations;
//# sourceMappingURL=user.validator.js.map