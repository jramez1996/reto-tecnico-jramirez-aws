"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/openapi.ts
var openapi_exports = {};
__export(openapi_exports, {
  openapi: () => openapi
});
module.exports = __toCommonJS(openapi_exports);
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var openapi = async (event) => {
  try {
    const filePath = path.join(__dirname, "../openapi.yml");
    let data = fs.readFileSync(filePath, "utf8");
    const protocol = event.headers["X-Forwarded-Proto"] || "http";
    const apiGatewayUrl = `${protocol}://${event.headers["Host"]}`;
    data = data.replace("URL_APIGATEGAY", apiGatewayUrl);
    const metaPath = path.join(__dirname, "../.serverless/meta.json");
    let metaData = fs.readFileSync(metaPath, "utf8");
    let parsedMetaData = JSON.parse(metaData);
    const firstKey = Object.keys(parsedMetaData)[0];
    const outputs = parsedMetaData[firstKey].serviceProviderAwsCfStackOutputs.find((event2) => event2.OutputKey === "HttpApiUrl");
    if (!event.headers["Host"].includes("localhost")) {
      if (outputs) {
        data = data.replace("URL_APIGATEGAY", outputs?.OutputValue);
      }
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/x-yaml",
        "Access-Control-Allow-Origin": "*"
        // Permitir todos los orígenes
      },
      body: data
    };
  } catch (error) {
    console.error("Error loading openapi.yml:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  openapi
});
//# sourceMappingURL=openapi.js.map
