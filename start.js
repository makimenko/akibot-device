
var wpi = require('wiring-pi');
//var async = require('async');

wpi.wiringPiSetup();

console.log("Starting...");


var pinInput1 = 3;
var pinInput2 = 2;
var pinEN = 26;

wpi.pinMode(pinInput1, wpi.OUTPUT);
wpi.pinMode(pinInput2, wpi.OUTPUT);
wpi.pinMode(pinEN, wpi.PWM_OUTPUT);

console.log("Low");
wpi.digitalWrite(pinInput1, wpi.LOW);
wpi.digitalWrite(pinInput2, wpi.LOW);
wpi.digitalWrite(pinEN, wpi.LOW);

// RIGHT Wheel (3,2,26): 011: Forward (pwm: 500-1000)
console.log("Run");
wpi.digitalWrite(pinInput1, wpi.HIGH);
wpi.digitalWrite(pinInput2, wpi.LOW);
wpi.pwmWrite(pinEN, 500);

setTimeout(() => {
    console.log("B")
    wpi.pwmWrite(pinEN, 700);
    setTimeout(() => {
        console.log("C")
        wpi.pwmWrite(pinEN, 1000);
        setTimeout(() => {
            console.log("Disabling");
            wpi.pwmWrite(pinEN, 0);
        }, 2000);
    }, 2000);
}, 2000);



console.log("END.");
