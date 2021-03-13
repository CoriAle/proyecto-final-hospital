"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const health_controller_1 = __importDefault(require("./controllers/health.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const doctor_controller_1 = __importDefault(require("./controllers/doctor.controller"));
const hospital_controller_1 = __importDefault(require("./controllers/hospital.controller"));
const routes = (app) => {
    app.use('/v1/health', health_controller_1.default);
    app.use('/v1/user', user_controller_1.default);
    app.use('/v1/doctor', doctor_controller_1.default);
    app.use('/v1/hospital', hospital_controller_1.default);
};
exports.default = routes;
//# sourceMappingURL=routes.js.map