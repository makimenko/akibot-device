var wpi = require('wiring-pi');

var pin_base = 100;
var count = 16;
var i2c_addr = 0x20;

console.log("Setup...");
wpi.wiringPiSetup();
wpi.mcp23017Setup(pin_base, i2c_addr);


console.log("Running...");
for (var i = pin_base; i < pin_base + count; i++) {
    wpi.pinMode(i, 1);
    wpi.digitalWrite(i, 1);
}
wpi.delay(1000);


console.log("End.");