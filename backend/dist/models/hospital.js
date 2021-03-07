"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HospitalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    doctors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Doctor',
        }
    ],
}, { timestamps: true });
exports.default = mongoose_1.model('Doctor', HospitalSchema);
//# sourceMappingURL=hospital.js.map