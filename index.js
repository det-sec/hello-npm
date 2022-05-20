const { existsSync } = require("fs");
const { join } = require("path");

const { platform, arch } = process;

let nativeBinding = null;

switch (platform) {
  case "win32":
    switch (arch) {
      case "ia32":
        localFileExisted = existsSync(
          join(__dirname, "native.win32-ia32-msvc.node")
        );
        try {
          if (localFileExisted) {
            nativeBinding = require("./native.win32-ia32-msvc.node");
          } else {
            nativeBinding = require("@node-rs/native-win32-ia32-msvc");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`);
    }
    break;
  case "darwin":
    switch (arch) {
      case "x64":
        localFileExisted = existsSync(join(__dirname, "native.node"));
        try {
          if (localFileExisted) {
            nativeBinding = require("./native.node");
          } else {
            nativeBinding = require("@node-rs/native-darwin-x64");
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
