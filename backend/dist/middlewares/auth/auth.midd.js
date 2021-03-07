"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const auth_token = (req, res, next) => {
    const token = String(req.get('x-auth-token'));
    if (!token) {
        const custom = new error_1.ErrorHandler(401, 'No token. Authorization denied.');
        error_1.handleError(custom, req, res);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token, config_1.default.get('jwt_secret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(401, 'Token is not valid.');
        error_1.handleError(custom, req, res);
        return;
    }
};
exports.default = auth_token;
//# sourceMappingURL=auth.midd.js.map