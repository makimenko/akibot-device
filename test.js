var device = require('./index.js');

console.log("Starting...");

var p = new device.L239DPair(26, 3, 2);

p.clockwise(0.1);

setTimeout(() => {
    console.log("B")
    p.counterClockwise(0.5);
    setTimeout(() => {
        console.log("C")
        p.clockwise(1);
        setTimeout(() => {
            console.log("Disabling");
            p.stop();
        }, 2000);
    }, 2000);
}, 2000);


console.log("END.");
