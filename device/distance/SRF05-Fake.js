class SRF05 {

    constructor(triggerPin, echoPin) {
        console.warn("WARNING: FAKE IMPLEMENTATION OF SRF05");
        this.pinBase = pinBase;
        this.addrI2C = addrI2C;
    }

    getDistanceMm() {
        return Math.random();
    }
    
}


module.exports = SRF05;