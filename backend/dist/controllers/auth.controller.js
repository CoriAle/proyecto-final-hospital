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
const auth_midd_1 = __importDefault(require("../middlewares/auth/auth.midd"));
const router = express_1.Router();
router.post('/', auth_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_1.default.findOne({ email });
        if (user) {
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                const custom = new error_1.ErrorHandler(400, 'Invalid Credentials');
                error_1.handleError(custom, req, res);
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            jsonwebtoken_1.default.sign(payload, config_1.default.get('jwt_secret'), { expiresIn: 3600 }, (err, token) => {
                if (err)
                    throw err;
                res.status(200);
                res.json({ token });
            });
        }
        else {
            const custom = new error_1.ErrorHandler(400, 'Invalid User');
            error_1.handleError(custom, req, res);
        }
    }
    catch (err) {
        // console.log(err);
        const custom = new error_1.ErrorHandler(500, 'Server Error');
        error_1.handleError(custom, req, res);
    }
}));
router.get('/', auth_midd_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (userId) {
            const user = yield user_1.default.findById(userId, 'name email');
            return res.status(201).json({
                data: user,
                msj: 'User info!',
            });
        }
        else {
            const custom = new error_1.ErrorHandler(403, 'Not authenticated');
            error_1.handleError(custom, req, res);
        }
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
exports.default = router;
//# sourceMappingURL=auth.controller.js.map