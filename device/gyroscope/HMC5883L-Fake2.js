var HMC5883L = /** @class */ (function () {
    function HMC5883L(address) {
        console.warn("FAKE IMPLEMENTATION OF HMC5883L");
        this.address = address;
    }
    HMC5883L.prototype.readMag = function () {
        var x = Math.random();
        var y = Math.random();
        var z = Math.random();
        return { x: x, y: y, z: z };
    };
    ;
    HMC5883L.prototype.readConfig = function () {
        return undefined;
    };
    ;
    HMC5883L.prototype.dumpConfig = function () {
        return undefined;
    };
    ;
    return HMC5883L;
}());

module.exports = HMC5883L;