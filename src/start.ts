import { logFactory } from "./log-config";

var logger = logFactory.getLogger("sandbox");

logger.info("Starting...")

import { HMC5883L } from './device/gyroscope/HMC5883L.js';
import { MCP23017 } from './device/expander/MCP23017.js';

var expander = new MCP23017(100, 0x20);
expander.pinMode(1, 1);
expander.digitalWrite(1, 1);

var gyroscope = new HMC5883L(0x1e);

logger.info("Gyroscope value: " + JSON.stringify(gyroscope.readMag()));


logger.info("end.")
