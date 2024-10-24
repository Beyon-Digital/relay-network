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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
var lodash_memoize_1 = __importDefault(require("lodash.memoize"));
var relay_runtime_1 = require("relay-runtime");
var react_relay_network_modern_1 = require("react-relay-network-modern");
var middleware_1 = require("./middleware");
var source = new relay_runtime_1.RecordSource();
var store = new relay_runtime_1.Store(source);
/**
 * DEFAULT Environment Builder for production
 *
 * @param {MiddlewareBuilderProps} props - The properties for building the middleware.
 * @param {Object} networkOpts - The network options for the RelayNetworkLayer.
 * @returns {Environment} - The Relay Environment instance.
 */
var EnvironmentBuilder = (0, lodash_memoize_1.default)(function (_a) {
    var networkOpts = _a.networkOpts, props = __rest(_a, ["networkOpts"]);
    var mw = (0, middleware_1.middlewares)(props);
    var env = new relay_runtime_1.Environment({
        network: new react_relay_network_modern_1.RelayNetworkLayer(mw, networkOpts),
        store: store
    });
    return env;
});
exports.default = EnvironmentBuilder;
var middleware_2 = require("./middleware");
Object.defineProperty(exports, "middlewares", { enumerable: true, get: function () { return middleware_2.middlewares; } });
