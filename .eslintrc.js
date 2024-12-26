// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          "fs",
          "net",
          "http",
          "https",
          "child_process",
          "os",
          "path",
          "stream",
          "tls",
          "zlib",
          "crypto",
          "util",
          "url",
          "querystring",
          "vm",
          "events",
        ],
        message:
          "This module is not compatible with React Native, please use a compatible alternative.",
      },
    ],
  },
};
