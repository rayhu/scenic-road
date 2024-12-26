const fs = require("fs");
const path = require("path");

// List of Node.js core modules
const nodeCoreModules = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
];

// Read package.json
const packageJsonPath = path.resolve(process.cwd(), "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error("package.json not found!");
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const dependencies = {
  ...(packageJson.dependencies || {}),
  ...(packageJson.devDependencies || {}),
};

// Check if any dependencies are Node.js core modules
const coreModulesFound = Object.keys(dependencies).filter((dep) =>
  nodeCoreModules.includes(dep),
);

if (coreModulesFound.length > 0) {
  console.log(
    "The following Node.js core modules are listed in your package.json:",
  );
  coreModulesFound.forEach((module) => console.log(`- ${module}`));
  console.log(
    "These are built-in Node.js modules and should not be installed as dependencies.",
  );
  process.exit(1);
} else {
  console.log(
    "No Node.js core modules found in your package.json dependencies.",
  );
}
