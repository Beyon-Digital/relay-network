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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = exports.dev = void 0;
var react_relay_network_modern_1 = require("react-relay-network-modern");
// constants
exports.dev = process.env.NODE_ENV === "development";
;
var middlewares = function (_a) {
    var url = _a.url, apiToken = _a.apiToken, token = _a.token, extraHeaders = _a.extraHeaders, extraMiddleware = _a.extraMiddleware;
    return (__spreadArray(__spreadArray([
        (0, react_relay_network_modern_1.cacheMiddleware)({
            size: 100, // max 100 requests
            'ttl': 900000, // 250 minutes
            'allowMutations': true,
            'allowFormData': true,
        }),
        (0, react_relay_network_modern_1.urlMiddleware)({
            url: function () { return Promise.resolve(url); },
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: function (req) {
                var _a, _b;
                return (__assign({ "Access-Control-Allow-Origin": "true", "Access-Control-Allow-Methods": "POST, OPTIONS, GET", "Access-Control-Allow-Credentials": "true", "CLIENT-ID": apiToken, "Access-Control-Allow-Headers": "API, Content-Type, Dnt, Origin, User-Agent, csrftoken, X-CSRFToken, Access-Control-Allow-Origin, AUTHORIZATION", 'X-CSRFToken': (_a = req.fetchOpts.headers["X-CSRFToken"]) !== null && _a !== void 0 ? _a : "", 'csrftoken': (_b = req.fetchOpts.headers["csrftoken"]) !== null && _b !== void 0 ? _b : "" }, extraHeaders));
            },
            'cache': 'reload',
            'redirect': 'follow'
        }),
        (0, react_relay_network_modern_1.authMiddleware)({
            token: token,
            allowEmptyToken: true,
            header: "AUTHORIZATION",
            "prefix": "Bearer "
        }),
        (0, react_relay_network_modern_1.retryMiddleware)({
            fetchTimeout: 360,
            retryDelays: function (attempt) { return Math.pow(2, attempt + 4) * 100; }, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
            beforeRetry: function (_a) {
                var forceRetry = _a.forceRetry, abort = _a.abort, delay = _a.delay, attempt = _a.attempt, lastError = _a.lastError, req = _a.req;
                if (attempt > 10)
                    abort();
                console.log('call `forceRelayRetry()` for immediately retry! Or wait ' + delay + ' ms.');
            },
            statusCodes: [500, 503, 504],
            'logger': function (event) { return console.log('Retry: ', event); }
        }),
        (0, react_relay_network_modern_1.progressMiddleware)({
            onProgress: function (current, total) {
                console.log('Downloaded: ' + current + ' B, total: ' + total + ' B');
                if (window && window.dispatchEvent) {
                    var px = new CustomEvent("progress", { detail: { progress: current / (total !== null && total !== void 0 ? total : 100) } });
                    window.dispatchEvent(px);
                }
            },
        }),
        (0, react_relay_network_modern_1.uploadMiddleware)()
    ], (exports.dev ? [
        (0, react_relay_network_modern_1.errorMiddleware)(),
        (0, react_relay_network_modern_1.loggerMiddleware)(),
        (0, react_relay_network_modern_1.perfMiddleware)()
    ] : []), true), (extraMiddleware !== null && extraMiddleware !== void 0 ? extraMiddleware : []), true));
};
exports.middlewares = middlewares;
