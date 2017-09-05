// On RaspberyPI it should be availble. On workstation -> not
try {
    var wpi = require('wiring-pi');
    var wpiVersion = require('wiring-pi/package.json').version
} catch (er) {
    console.warn("wiring-pi is unavailable");
    wpi = null;
}


// Refactored Source from https://github.com/nkolban/hmc5883l-pi/blob/master/src/hmc5883l-pi.js
class HMC5883L {
  
    constructor(address) {

    this.HMC5883L_REG_CONFIG_A = 0x00;
    this.HMC5883L_REG_CONFIG_B = 0x01;

    this.HMC5883L_REG_MODE = 0x02;
    this.HMC5883L_REG_MSB_X = 0x03;
    this.HMC5883L_REG_LSB_X = 0x04;
    this.HMC5883L_REG_MSB_Z = 0x05;
    this.HMC5883L_REG_LSB_Z = 0x06;
    this.HMC5883L_REG_MSB_Y = 0x07;
    this.HMC5883L_REG_LSB_Y = 0x08;
    this.HMC5883L_REG_STATUS = 0x09;
    this.HMC5883L_REG_ID_A = 0x0a;
    this.HMC5883L_REG_ID_B = 0x0b;
    this.HMC5883L_REG_ID_C = 0x0c;

    this.HMC5883L_MODE_CONTINUOUS = 0x00;
    this.HMC5883L_MODE_SINGLE = 0x01;

    this.address = address;
    this.fd = wpi.wiringPiI2CSetup(address);
    wpi.wiringPiI2CWriteReg8(this.fd, this.HMC5883L_REG_MODE, this.HMC5883L_MODE_CONTINUOUS);
  }

  toShort(value) {
    if ((value & (1 << 15)) == 0) {
      return value;
    }
    return (value & ~(1 << 15)) - (1 << 15);
  }

  readMag () {
    var msb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_MSB_X);
    var lsb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_LSB_X);
    var x = this.toShort(msb << 8 | lsb);

    msb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_MSB_Y);
    lsb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_LSB_Y);
    var y = this.toShort(msb << 8 | lsb);

    msb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_MSB_Z);
    lsb = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_LSB_Z);
    var z = this.toShort(msb << 8 | lsb);
    return { x: x, y: y, z: z };
  };

  readConfig () {
    var ret = {};
    var regValue = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_CONFIG_A);
    ret.averagedSamples = (regValue & 0x60) >> 5;
    ret.dataOutput = (regValue & 0x1c) >> 2;
    ret.measurementConfig = (regValue & 0x03);

    var regValue = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_CONFIG_B);
    ret.gain = (regValue & 0xe0) >> 5;

    var regValue = wpi.wiringPiI2CReadReg8(this.fd, this.HMC5883L_REG_MODE);
    ret.highSpeed = (regValue & 0x80 != 0);
    ret.operatingMode = (regValue & 0x03);

    return ret;
  };

  dumpConfig () {
    var value = this.readConfig();
    var averagedSampled;
    var dataOutput;
    var measurementConfig;
    var gain;

    switch (value.averagedSamples) {
      case 0:
        averagedSampled = 1;
        break;
      case 1:
        averagedSampled = 2;
        break;
      case 2:
        averagedSampled = 4;
        break;
      case 3:
        averagedSampled = 8;
        break;
    }

    switch (value.dataOutput) {
      case 0:
        dataOutput = 0.75;
        break;
      case 1:
        dataOutput = 1.5;
        break;
      case 2:
        dataOutput = 3.0;
        break;
      case 3:
        dataOutput = 7.5;
        break;
      case 4:
        dataOutput = 15.0;
        break;
      case 5:
        dataOutput = 30.0
        break;
      case 6:
        dataOutput = 75.0;
        break;
      case 7:
        dataOutput = -1;
        break;
    }

    switch (value.measurementConfig) {
      case 0:
        measurementConfig = "Normal";
        break;
      case 1:
        measurementConfig = "Positive bias";
        break;
      case 2:
        measurementConfig = "Negative bias";
        break;
      case 3:
        measurementConfig = "!!reserved!!";
        break;
    }

    switch (value.gain) {
      case 0:
        gain = 1370;
        break;
      case 1:
        gain = 1090;
        break;
      case 2:
        gain = 820;
        break;
      case 3:
        gain = 660;
        break;
      case 4:
        gain = 440;
        break;
      case 5:
        gain = 390;
        break;
      case 6:
        gain = 330;
        break;
      case 7:
        gain = 230;
        break;
    }
    return {
      averagedSampled: averagedSampled,
      dataOutput: dataOutput,
      measurementConfig: measurementConfig,
      gain: gain
    }
  };

}


module.exports = HMC5883L;