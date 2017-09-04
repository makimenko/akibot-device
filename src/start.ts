import { logFactory } from "./log-config";
import { HMC5883L } from './device/gyroscope/HMC5883L.js';
import { MCP23017 } from './device/expander/MCP23017.js';
import { GyroscopeCalibration } from "./device/gyroscope/GyroscopeCalibration";

var logger = logFactory.getLogger("sandbox");
logger.info("Starting...")

logger.info("Testing expander...")
var expander = new MCP23017(100, 0x20);
expander.pinMode(1, 1);
expander.digitalWrite(1, 1);

logger.info("Testing gyroscope...")
var gyroscope = new HMC5883L(0x1e);
logger.debug("Gyroscope value: " + JSON.stringify(gyroscope.readMag()));


var calib = new GyroscopeCalibration(gyroscope);
var calibPromise = calib.calibrate(10000, 100);

calibPromise.then((result) => {
    logger.info("Calibration finished: " + JSON.stringify(result));
});


logger.info("END")