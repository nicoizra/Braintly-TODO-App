"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
require('dotenv').config();
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)()
});
const db = (0, app_1.getApp)();
exports.db = db;
