// On RaspberyPI it should be availble. On workstation -> not
try {
  var wpi = require('wiring-pi');
  var wpiVersion = require('wiring-pi/package.json').version
} catch (er) {
  console.warn("wiring-pi is unavailable");
  wpi = null;
}

class L239DPair {



  constructor(pinEN, pinFirstA, pinSecondA) {
    this.pinEN = pinEN;
    this.pinFirstA = pinFirstA;
    this.pinSecondA = pinSecondA;

    // Not needed to configure. Hardcoded:
    this.minFrequency = 500;
    this.maxFrequency = 1000;
    this.intervalFrequency = this.maxFrequency - this.minFrequency;

    wpi.pinMode(this.pinFirstA, wpi.OUTPUT);
    wpi.pinMode(this.pinSecondA, wpi.OUTPUT);
    wpi.pinMode(this.pinEN, wpi.PWM_OUTPUT);

    this.stop();
  }

  write(firstBit, secondBit, frequency) {
    wpi.digitalWrite(this.pinFirstA, firstBit);
    wpi.digitalWrite(this.pinSecondA, secondBit);
    wpi.pwmWrite(this.pinEN, frequency);
  }

  stop() {
    this.write(wpi.LOW, wpi.LOW, 0);
  }

  calcFrequency(pctSpeed) {
    return this.minFrequency + (this.intervalFrequency * pctSpeed);
  }

  writePct(firstBit, secondBit, pctSpeed) {
    if (pctSpeed == 0) {
      this.stop();
    } else if (pctSpeed >= 0 && pctSpeed <= 1) {
      this.write(firstBit, secondBit, this.calcFrequency(pctSpeed));
    } else {
      throw new Error("pctSpeed value is invalid")
    }
  }

  clockwise(pctSpeed) {
    this.writePct(wpi.LOW, wpi.HIGH, pctSpeed);
  }

  counterClockwise(pctSpeed) {
    this.writePct(wpi.HIGH, wpi.LOW, pctSpeed);
  }

}

module.exports = L239DPair;