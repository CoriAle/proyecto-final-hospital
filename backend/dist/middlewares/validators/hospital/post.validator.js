"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validations = [
    express_validator_1.body('name').exists().withMessage("Missing field 'Name'"),
    express_validator_1.body('phone').exists().withMessage("Missing field 'Phone'"),
    express_validator_1.body('adress').exists().withMessage("Missing field 'Adress'"),
    express_validator_1.body('name')
        .if(express_validator_1.body('name').exists())
        .isLength({ min: 1 })
        .withMessage('name need at least one character'),
];
exports.default = validations;
//# sourceMappingURL=post.validator.js.map