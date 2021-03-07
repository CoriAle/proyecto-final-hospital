"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DoctorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    hospitals: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Hospital',
        }
    ],
}, { timestamps: true });
exports.default = mongoose_1.model('Doctor', DoctorSchema);
//# sourceMappingURL=doctor.js.map