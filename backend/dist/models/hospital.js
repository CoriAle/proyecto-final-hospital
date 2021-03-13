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
}, { timestamps: true });
exports.default = mongoose_1.model('Hospital', HospitalSchema);
//# sourceMappingURL=hospital.js.map