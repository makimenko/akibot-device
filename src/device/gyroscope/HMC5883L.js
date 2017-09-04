// Refactored Source from https://github.com/nkolban/hmc5883l-pi/blob/master/src/hmc5883l-pi.js
var wpi = require('wiring-pi');

export class HMC5883L {



  HMC5883L_REG_CONFIG_A = 0x00;
  HMC5883L_REG_CONFIG_B = 0x01;

  HMC5883L_REG_MODE = 0x02;
  HMC5883L_REG_MSB_X = 0x03;
  HMC5883L_REG_LSB_X = 0x04;
  HMC5883L_REG_MSB_Z = 0x05;
  HMC5883L_REG_LSB_Z = 0x06;
  HMC5883L_REG_MSB_Y = 0x07;
  HMC5883L_REG_LSB_Y = 0x08;
  HMC5883L_REG_STATUS = 0x09;
  HMC5883L_REG_ID_A = 0x0a;
  HMC5883L_REG_ID_B = 0x0b;
  HMC5883L_REG_ID_C = 0x0c;

  HMC5883L_MODE_CONTINUOUS = 0x00;
  HMC5883L_MODE_SINGLE = 0x01;



  constructor(address) {
    this.address = address;
    this.fd = wpi.wiringPiI2CSetup(address);
    wpi.wiringPiI2CWriteReg8(fd, HMC5883L_REG_MODE, HMC5883L_MODE_CONTINUOUS);
  }


  toShort(value) {
    if ((value & (1 << 15)) == 0) {
      return value;
    }
    return (value & ~(1 << 15)) - (1 << 15);
  }

  readMag = function () {
    var msb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_MSB_X);
    var lsb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_LSB_X);
    var x = toShort(msb << 8 | lsb);

    msb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_MSB_Y);
    lsb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_LSB_Y);
    var y = toShort(msb << 8 | lsb);

    msb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_MSB_Z);
    lsb = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_LSB_Z);
    var z = toShort(msb << 8 | lsb);
    return { x: x, y: y, z: z };
  };

  readConfig = function () {
    var ret = {};
    var regValue = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_CONFIG_A);
    ret.averagedSamples = (regValue & 0x60) >> 5;
    ret.dataOutput = (regValue & 0x1c) >> 2;
    ret.measurementConfig = (regValue & 0x03);

    var regValue = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_CONFIG_B);
    ret.gain = (regValue & 0xe0) >> 5;

    var regValue = wpi.wiringPiI2CReadReg8(fd, HMC5883L_REG_MODE);
    ret.highSpeed = (regValue & 0x80 != 0);
    ret.operatingMode = (regValue & 0x03);

    return ret;
  };

  dumpConfig = function () {
    var value = exports.readConfig();
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

    console.log("averagedSampled=%s, dataOutput=%s, measurementConfig=%s, gain=%s", averagedSampled, dataOutput, measurementConfig, gain);
  };



}


