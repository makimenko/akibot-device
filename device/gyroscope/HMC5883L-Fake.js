class HMC5883L {

  constructor(address) {
    console.warn("WARNING: FAKE IMPLEMENTATION OF HMC5883L");
    this.address = address;
  }

  readMag() {
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;
    var z = Math.random() - 0.5;
    return { x: x, y: y, z: z };
  };

  readConfig() {
    return undefined;
  };

  dumpConfig() {
    return undefined;
  };

}

module.exports = HMC5883L;