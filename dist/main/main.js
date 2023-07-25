"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../routes/api"));
const body_parser_1 = __importDefault(require("body-parser"));
const session_1 = require("../config/session");
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(session_1.sessionConfig);
app.get('/', async (req, res) => {
    res.status(200).send('Hello World!');
});
app.get('/welcome', async (req, res) => {
    res.status(200).send('Hello Zulkifli!');
});
app.use('/api', api_1.default);
app.get('/api/welcome', (req, res) => {
    res.send('Test - PT.Surya Digital Teknologi!');
});
// app.listen(port, () => {
//     console.log(`\n${ appName } (${appEnv}) listening to http://localhost:${ port }`)
// })
exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=main.js.map