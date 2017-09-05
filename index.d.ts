declare module "akibot-device" {

    declare class HMC5883L {
        constructor(address: number);
        readMag(): { x, y, z };
    }

    declare class MCP23017 {
        constructor(pinBase: number, addrI2C: number);
        pinMode(pin: number, mode: number);
        digitalWrite(pin: number, value: number);
    }

}