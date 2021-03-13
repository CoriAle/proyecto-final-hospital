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
const error_1 = require("../error");
const hospital_1 = __importDefault(require("../models/hospital"));
const post_validator_1 = __importDefault(require("../middlewares/validators/hospital/post.validator"));
const put_validator_1 = __importDefault(require("../middlewares/validators/hospital/put.validator"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = express_1.Router();
router.post('/', 
//auth_token, 
post_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, adress, } = req.body;
        const newHospital = new hospital_1.default({
            name,
            phone,
            adress,
        });
        const hospital = yield newHospital.save();
        return res.status(201).json({
            data: hospital,
            msj: 'Hospital created!',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.put('/:id', 
//auth_token, 
put_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, adress, } = req.body;
        const hospitalFields = {};
        if (name)
            hospitalFields.name = name;
        if (phone)
            hospitalFields.phone = phone;
        if (adress)
            hospitalFields.adress = adress;
        let hospital = yield hospital_1.default.findById(req.params.id);
        if (!hospital) {
            const custom = new error_1.ErrorHandler(404, 'Hospital not found.');
            error_1.handleError(custom, req, res);
        }
        hospital = yield hospital_1.default.findByIdAndUpdate(req.params.id, { $set: hospitalFields }, { new: true });
        return res.status(200).json({
            data: hospital,
            msj: 'Hospital updated!',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.get('/', 
// auth_token,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hospitals = yield hospital_1.default.find({}).sort('-createdAt');
        return res.status(200).json({
            data: hospitals,
            msj: 'List of hospitals',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.delete('/:id', 
// auth_token,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const hospital = yield hospital_1.default.findById(id);
        if (!hospital) {
            const custom = new error_1.ErrorHandler(404, 'Hospital not found.');
            error_1.handleError(custom, req, res);
        }
        yield hospital_1.default.findByIdAndRemove(id);
        return res.status(200).json({
            data: hospital,
            msj: 'Hospital Removed',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
exports.default = router;
//# sourceMappingURL=hospital.controller.js.map