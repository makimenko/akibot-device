var wpi = require('wiring-pi');

exports.init = function (pinBase, addrI2C) {
    console.log("init...");
    wpi.wiringPiSetup();
    wpi.mcp23017Setup(pinBase, addrI2C);
}

exports.pinMode = function (pin, mode) {
    console.log("pinMode: " + pin + " - " + mode);
    wpi.pinMode(pin, mode);
}

exports.digitalWrite = function (pin, value) {
    console.log("digitalWrite: " + pin + " - " + value);
    wpi.digitalWrite(pin, value);
}

