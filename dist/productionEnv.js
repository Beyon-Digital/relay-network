"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var relay_runtime_1 = require("relay-runtime");
var react_relay_network_modern_1 = require("react-relay-network-modern");
var middleware_1 = require("./middleware");
var source = new relay_runtime_1.RecordSource();
var store = new relay_runtime_1.Store(source);
var EnvironmentBuilder = function (_a) {
    var networkOpts = _a.networkOpts, props = __rest(_a, ["networkOpts"]);
    return new relay_runtime_1.Environment({
        network: new react_relay_network_modern_1.RelayNetworkLayer((0, middleware_1.middlewares)(props), networkOpts),
        store: store
    });
};
exports.default = EnvironmentBuilder;
