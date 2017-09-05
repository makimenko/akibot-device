try {
    var wpi = require('wiring-pi');
    var wpiVersion = require('wiring-pi/package.json').version;

    // Proper device implementation:
    var isFake = false;
    var HMC5883L = require('./device/gyroscope/HMC5883L-RPi.js');
    var MCP23017 = require('./device/expander/MCP23017-RPi.js');

} catch (er) {
    console.warn("wiring-pi is unavailable => using fake implementation");
    // Fake implementation:
    var isFake = true;
    var HMC5883L = require('./device/gyroscope/HMC5883L-Fake.js');
    var MCP23017 = require('./device/expander/MCP23017-Fake.js');
}

module.exports = HMC5883L;
module.exports = MCP23017;
module.exports = isFake;
