"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_config_1 = require("./log-config");
;
class GyroscopeCalibration {
    constructor(gyroscope) {
        this.gyroscope = gyroscope;
        this.logger = log_config_1.logFactory.getLogger(this.constructor.name);
        this.logger.debug("constructor");
        this.calibrateIteration = this.calibrateIteration.bind(this);
        this.clearTimers = this.clearTimers.bind(this);
    }
    calibrate(maxTime, intervalMs) {
        this.logger.info("Starting calibration...");
        this.resetStats();
        return new Promise((resolve, reject) => {
            this.intervalID = setInterval(this.calibrateIteration, intervalMs);
            this.timeoutID = setTimeout(() => {
                this.clearTimers();
                this.logger.debug("Calculating gyroscope offset from: " + JSON.stringify(this.stats));
                var calibrationResult = {
                    x: (this.stats.maxX + this.stats.minX) / 2,
                    y: (this.stats.maxY + this.stats.minY) / 2,
                    z: (this.stats.maxZ + this.stats.minZ) / 2,
                };
                this.logger.debug("Calibration finished with result: " + JSON.stringify(calibrationResult));
                resolve(calibrationResult);
            }, maxTime);
        });
    }
    clearTimers() {
        this.logger.trace("clearInterval: " + this.intervalID);
        clearInterval(this.intervalID);
        this.logger.trace("clearTimeout: " + this.timeoutID);
        clearTimeout(this.timeoutID);
    }
    calibrateIteration() {
        this.logger.trace("calibrateIteration");
        var data = this.gyroscope.readMag();
        this.updateStats(data);
    }
    resetStats() {
        this.logger.trace("resetStats");
        this.stats = {
            minX: 100000,
            minY: 100000,
            minZ: 100000,
            maxX: -100000,
            maxY: -100000,
            maxZ: -100000
        };
    }
    updateStats(value) {
        this.logger.trace("updateStats: " + JSON.stringify(value));
        if (value.x < this.stats.minX) {
            this.stats.minX = value.x;
        }
        if (value.y < this.stats.minY) {
            this.stats.minY = value.y;
        }
        if (value.z < this.stats.minZ) {
            this.stats.minZ = value.z;
        }
        if (value.x > this.stats.maxX) {
            this.stats.maxX = value.x;
        }
        if (value.y > this.stats.maxY) {
            this.stats.maxY = value.y;
        }
        if (value.z > this.stats.maxZ) {
            this.stats.maxZ = value.z;
        }
    }
}
exports.GyroscopeCalibration = GyroscopeCalibration;
//# sourceMappingURL=GyroscopeCalibration.js.map