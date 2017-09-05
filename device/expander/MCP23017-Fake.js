class MCP23017 {

    constructor(pinBase, addrI2C) {
        console.warn("FAKE IMPLEMENTATION OF MCP23017");
        this.pinBase = pinBase;
        this.addrI2C = addrI2C;
    }

    pinMode(pin, mode) {
    }

    digitalWrite(pin, value) {
       
    }
}


module.exports = MCP23017;