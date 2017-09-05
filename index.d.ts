declare module "akibot-device" {

    export class HMC5883L {
        constructor(address: number);
        readMag(): { x, y, z };
    }

    export class MCP23017 {
        constructor(pinBase: number, addrI2C: number);
        pinMode(pin: number, mode: number);
        digitalWrite(pin: number, value: number);
    }
    
}