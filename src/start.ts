import { logFactory } from "./log-config";


var logger = logFactory.getLogger("sandbox");

logger.info("Starting...")

import * as HMC5883L from './device/gyroscope/HMC5883L.js';
import * as MCP23017 from './device/expander/MCP23017.js';

MCP23017.init(100, 0x20);
MCP23017.pinMode(100+1, 1);
MCP23017.digitalWrite(100+1, 1);



var data = HMC5883L.readMag();
logger.info("Gyroscope value: "+JSON.stringify(data));


logger.info("end.")
