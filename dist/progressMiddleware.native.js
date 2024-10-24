"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressMiddleware = void 0;
var react_relay_network_modern_1 = require("react-relay-network-modern");
var react_native_1 = require("react-native");
var progressMiddleware = function (options) {
    return (0, react_relay_network_modern_1.progressMiddleware)(__assign(__assign({}, options), { onProgress: function (current, total) {
            console.log("Downloaded: " + current + " B, total: " + total + " B");
            react_native_1.DeviceEventEmitter.emit('loadingProgress', { current: current, total: total });
        } }));
};
exports.progressMiddleware = progressMiddleware;
