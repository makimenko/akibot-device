"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("akibot-log/dist");
exports.Logger = dist_1.Logger;
var rules = [
    { pattern: new RegExp(".*"), logLevel: dist_1.LogLevel.Info }
];
exports.logFactory = new dist_1.LogFactory(new dist_1.ConsoleLogAppender(), rules);
//# sourceMappingURL=log-config.js.map