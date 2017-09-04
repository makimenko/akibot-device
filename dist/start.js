"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_config_1 = require("./log-config");
const HMC5883L_js_1 = require("./device/gyroscope/HMC5883L.js");
const MCP23017_js_1 = require("./device/expander/MCP23017.js");
const GyroscopeCalibration_1 = require("./device/gyroscope/GyroscopeCalibration");
var logger = log_config_1.logFactory.getLogger("sandbox");
logger.info("Starting...");
logger.info("Testing expander...");
var expander = new MCP23017_js_1.MCP23017(100, 0x20);
expander.pinMode(1, 1);
expander.digitalWrite(1, 1);
logger.info("Testing gyroscope...");
var gyroscope = new HMC5883L_js_1.HMC5883L(0x1e);
logger.debug("Gyroscope value: " + JSON.stringify(gyroscope.readMag()));
var calib = new GyroscopeCalibration_1.GyroscopeCalibration(gyroscope);
var calibPromise = calib.calibrate(10000, 100);
calibPromise.then((result) => {
    logger.info("Calibration finished: " + JSON.stringify(result));
});
logger.info("END");
//# sourceMappingURL=start.js.map