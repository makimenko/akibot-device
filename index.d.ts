export class HMC5883L {
    constructor(address: number);
    //dumpConfig(): any;
    //readConfig(): any;
    readMag(): { x: number, y: number, z: number };
}

export class MCP23017 {
    constructor(pinBase: number, addrI2C: number);
    digitalWrite(pin: number, value: number): void;
    pinMode(pin: number, mode: number): void;
}


export class SRF05 {
    constructor(triggerPin: number, echoPin: number);
    getDistanceMm(): number;
}

export const isFake: boolean;



export namespace HMC5883L {
    function readMag(): { x: number, y: number, z: number };
    namespace readMag {
        const prototype: {
        };
    }

    /*
    function dumpConfig(): any;
    function readConfig(): any;    
    
    namespace dumpConfig {
        const prototype: {
        };
    }

    namespace readConfig {
        const prototype: {
        };
    }
    */

}

export namespace MCP23017 {
    function digitalWrite(pin: number, value: number): void;
    function pinMode(pin: number, mode: number): void;
}

export namespace SRF05 {
    function getDistanceMm(): number;
}



