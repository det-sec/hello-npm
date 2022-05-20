const { existsSync } = require("fs");
const { join } = require("path");

let { platform, arch } = process;

let nativeBinding = null;

switch (platform) {
  case "win32":
    arch = "ia32";
    localFileExisted = existsSync(join(__dirname, "native.node"));
    try {
      if (localFileExisted) {
        nativeBinding = require(`./native.node`);
      } else {
        nativeBinding = require("@xltan/hello-npm-win32-ia32");
      }
    } catch (e) {
      loadError = e;
    }
    break;
  case "darwin":
    switch (arch) {
      case "x64":
        localFileExisted = existsSync(join(__dirname, "native.node"));
        try {
          if (localFileExisted) {
            nativeBinding = require(`./native.node`);
          } else {
            nativeBinding = require("@xltan/hello-npm-darwin-x64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`);
    }
    break;
}

console.log(nativeBinding);
