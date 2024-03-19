"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relay_runtime_1 = require("relay-runtime");
var react_relay_network_modern_1 = require("react-relay-network-modern");
var middleware_1 = require("./middleware");
var source = new relay_runtime_1.RecordSource();
var store = new relay_runtime_1.Store(source);
var prodEnv = function (props) { return new relay_runtime_1.Environment({
    network: new react_relay_network_modern_1.RelayNetworkLayer((0, middleware_1.middlewares)(props), {}),
    store: store
}); };
exports.default = prodEnv;
