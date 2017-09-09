// On RaspberyPI it should be availble. On workstation -> not
try {
    var wpi = require('wiring-pi');
    var wpiVersion = require('wiring-pi/package.json').version
} catch (er) {
    console.warn("wiring-pi is unavailable");
    wpi = null;
}

class MCP23017 {

    constructor(pinBase, addrI2C) {
        this.pinBase = pinBase;
        this.addrI2C = addrI2C;

        wpi.mcp23017Setup(pinBase, addrI2C);
    }

    pinMode(pin, mode) {
        wpi.pinMode(this.pinBase + pin, mode);
    }

    digitalWrite(pin, value) {
        wpi.digitalWrite(this.pinBase + pin, value);
    }

}

module.exports = MCP23017;
