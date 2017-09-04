"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wpi = require('wiring-pi');
class MCP23017 {
    constructor(pinBase, addrI2C) {
        this.pinBase = pinBase;
        this.addrI2C = addrI2C;
        wpi.wiringPiSetup();
        wpi.mcp23017Setup(pinBase, addrI2C);
    }
    pinMode(pin, mode) {
        wpi.pinMode(this.pinBase + pin, mode);
    }
    digitalWrite(pin, value) {
        wpi.digitalWrite(this.pinBase + pin, value);
    }
}
exports.MCP23017 = MCP23017;
//# sourceMappingURL=MCP23017.js.map