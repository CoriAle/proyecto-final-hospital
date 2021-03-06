"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./repositories/db"));
let port = config_1.default.get('port');
if (config_1.default.util.getEnv('NODE_ENV') === 'production') {
    port = process.env.PORT;
}
if (!port) {
    process.exit(1);
}
const PORT = parseInt(port, 10);
const db_connection = new db_1.default();
db_connection.connect_db();
const server = app_1.default.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
//# sourceMappingURL=index.js.map