"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentBuilder = exports.middlewares = void 0;
var middleware_1 = require("./middleware");
Object.defineProperty(exports, "middlewares", { enumerable: true, get: function () { return middleware_1.middlewares; } });
var productionEnv_1 = require("./productionEnv");
Object.defineProperty(exports, "EnvironmentBuilder", { enumerable: true, get: function () { return __importDefault(productionEnv_1).default; } });
