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
const auth_midd_1 = __importDefault(require("../middlewares/auth/auth.midd"));
const doctor_1 = __importDefault(require("../models/doctor"));
const post_validator_1 = __importDefault(require("../middlewares/validators/doctor/post.validator"));
const put_validator_1 = __importDefault(require("../middlewares/validators/doctor/put.validator"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = express_1.Router();
router.post('/', auth_midd_1.default, post_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, speciality, adress, hospitals, } = req.body;
        const newDoctor = new doctor_1.default({
            name,
            email,
            phone,
            speciality,
            adress,
            hospitals,
        });
        const doctor = yield newDoctor.save();
        return res.status(201).json({
            data: doctor,
            msj: 'Doctor created!',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.put('/:id', auth_midd_1.default, put_validator_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, speciality, adress, hospitals, } = req.body;
        const doctorFields = {};
        if (name)
            doctorFields.name = name;
        if (email)
            doctorFields.email = email;
        if (phone)
            doctorFields.phone = phone;
        if (speciality)
            doctorFields.speciality = speciality;
        if (adress)
            doctorFields.adress = adress;
        if (hospitals)
            doctorFields.hospitals = hospitals;
        let doctor = yield doctor_1.default.findById(req.params.id);
        if (!doctor) {
            const custom = new error_1.ErrorHandler(404, 'Doctor not found.');
            error_1.handleError(custom, req, res);
        }
        doctor = yield doctor_1.default.findByIdAndUpdate(req.params.id, { $set: doctorFields }, { new: true }).populate('hospitals');
        return res.status(200).json({
            data: doctor,
            msj: 'Doctor updated!',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.get('/', auth_midd_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_1.default.find({}).populate('hospitals').sort('-createdAt');
        return res.status(200).json({
            data: doctors,
            msj: 'List of doctors',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
router.delete('/:id', auth_midd_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doctor = yield doctor_1.default.findById(id);
        if (!doctor) {
            const custom = new error_1.ErrorHandler(404, 'Doctor not found.');
            error_1.handleError(custom, req, res);
        }
        yield doctor_1.default.findByIdAndRemove(id);
        return res.status(200).json({
            data: doctor,
            msj: 'Doctor Removed',
        });
    }
    catch (err) {
        const custom = new error_1.ErrorHandler(500, 'Server Error.' + err._message);
        console.log(err);
        error_1.handleError(custom, req, res);
    }
}));
exports.default = router;
//https://stackoverflow.com/questions/46019149/many-to-many-with-mongoose
//# sourceMappingURL=doctor.controller.js.map