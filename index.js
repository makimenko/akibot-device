'use strict';

try {
    var wpi = require('wiring-pi');
    var wpiVersion = require('wiring-pi/package.json').version;

    // Proper device implementation:
    var isFake = false;
    var HMC5883L = require('./device/gyroscope/HMC5883L-RPi.js');
    var MCP23017 = require('./device/expander/MCP23017-RPi.js');
    //TODO:
    var SRF05 = require('./device/distance/SRF05-Fake.js');

} catch (er) {
    console.warn("WARNING: wiring-pi is unavailable => using fake implementation");
    // Fake implementation:
    var isFake = true;
    var HMC5883L = require('./device/gyroscope/HMC5883L-Fake.js');
    var MCP23017 = require('./device/expander/MCP23017-Fake.js');
    var SRF05 = require('./device/distance/SRF05-Fake.js');
}

module.exports = {
    isFake: isFake,
    HMC5883L: HMC5883L,
    MCP23017: MCP23017,
    SRF05: SRF05
};
