class HMC5883L {

  constructor(address) {
    console.warn("FAKE IMPLEMENTATION OF HMC5883L");
    this.address = address;
  }

  readMag() {
    return { x: 1, y: 2, z: 3 };
  };

  readConfig() {
    return undefined;
  };

  dumpConfig() {
    return undefined;
  };

}

module.exports = HMC5883L;