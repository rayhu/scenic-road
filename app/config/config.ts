import * as env from "../../bin/env";

export const config = {
  SERVER_URL: env.SERVER_URL || "https://scenic-server.surfski.llc",
  SERVER_API_KEY: env.SERVER_API_KEY || "default_secret_key",
  LOG_LEVEL: env.LOG_LEVEL || "info",
};
