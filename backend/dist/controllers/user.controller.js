"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../error");
const auth_validator_1 = __importDefault(require("../middlewares/validators/auth/auth.validator"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = express_1.Router();
router.post('/', auth_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield user_1.default.findOne({ email });
        if (user) {
            const custom = new error_1.ErrorHandler(400, 'User already exists.');
            error_1.handleError(custom, req, res);
        }
        user = new user_1.default({
            name,
            email,
            password,
        });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
        const payload = {
            use: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get('jwt_secret'), { expiresIn: 360000 }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                data: { token, user },
                msj: 'User Created',
            });
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.');
        error_1.handleError(custom, req, res);
    }
}));
exports.default = router;
//# sourceMappingURL=user.controller.js.map