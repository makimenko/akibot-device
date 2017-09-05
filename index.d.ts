export class HMC5883L {
    constructor(address: any);
    dumpConfig(): any;
    readConfig(): any;
    readMag(): any;
}

export class MCP23017 {
    constructor(...args: any[]);
    digitalWrite(...args: any[]): void;
    pinMode(...args: any[]): void;
}

export const isFake: boolean;

export namespace HMC5883L {
    function dumpConfig(): any;
    function readConfig(): any;
    function readMag(): any;
    namespace dumpConfig {
        const prototype: {
        };
    }

    namespace readConfig {
        const prototype: {
        };
    }

    namespace readMag {
        const prototype: {
        };
    }
}

export namespace MCP23017 {
    function digitalWrite(...args: any[]): void;
    function pinMode(...args: any[]): void;
}
