import { logger } from "react-native-logs";

// Create a logger instance with desired configuration
const log = logger.createLogger({
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
  },
  severity: "debug", // Set the default log level
  transportOptions: {
    colors: {
      info: "blue",
      warn: "yellow",
      error: "red",
      debug: "green",
    },
  },
});

export default log;
