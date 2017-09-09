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

export class L239DPair {
    constructor(pinEN: number, pinFirstA: number, pinSecondA: number);
    write(firstBit: number, secondBit: number, frequency: number): void;
    stop(): void;
    calcFrequency(pctSpeed: number): void;
    writePct(firstBit: number, secondBit: number, pctSpeed: number): void;
    clockwise(pctSpeed: number): void;
    counterClockwise(pctSpeed: number): void;
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



export namespace L239DPair {
    function write(firstBit: number, secondBit: number, frequency: number): void;
    function stop(): void;
    function calcFrequency(pctSpeed: number): void;
    function writePct(firstBit: number, secondBit: number, pctSpeed: number): void;
    function clockwise(pctSpeed: number): void;
    function counterClockwise(pctSpeed: number): void;
}



