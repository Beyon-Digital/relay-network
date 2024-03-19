"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    var url = _a.url, apiToken = _a.apiToken, token = _a.token;
    return (__spreadArray([
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
                return ({
                    "Access-Control-Allow-Origin": "true",
                    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
                    "Access-Control-Allow-Credentials": "true",
                    "CLIENT-ID": apiToken,
                    "Access-Control-Allow-Headers": "API, Content-Type, Dnt, Origin, User-Agent, csrftoken, X-CSRFToken, Access-Control-Allow-Origin, AUTHORIZATION",
                    'X-CSRFToken': (_a = req.fetchOpts.headers["X-CSRFToken"]) !== null && _a !== void 0 ? _a : "",
                    'csrftoken': (_b = req.fetchOpts.headers["csrftoken"]) !== null && _b !== void 0 ? _b : "",
                });
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
                var px = new CustomEvent("progress", { detail: { progress: current / (total !== null && total !== void 0 ? total : 100) } });
                window.dispatchEvent(px);
            },
        }),
        (0, react_relay_network_modern_1.uploadMiddleware)()
    ], (exports.dev ? [
        (0, react_relay_network_modern_1.errorMiddleware)(),
        (0, react_relay_network_modern_1.loggerMiddleware)(),
        (0, react_relay_network_modern_1.perfMiddleware)(),
        function (next) { return function (req) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, next(req)];
                    case 1:
                        res = _a.sent();
                        console.log(res.json);
                        return [2 /*return*/, res];
                }
            });
        }); }; },
    ] : []), true));
};
exports.middlewares = middlewares;
