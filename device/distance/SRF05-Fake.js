class SRF05 {

    constructor(triggerPin, echoPin) {
        console.warn("WARNING: FAKE IMPLEMENTATION OF SRF05");
        
    }

    getDistanceMm() {
        return Math.random();
    }
    
}


module.exports = SRF05;