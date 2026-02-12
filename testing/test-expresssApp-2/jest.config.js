import { createDefaultPreset } from "ts-jest";

const tsJestPreset = createDefaultPreset();

/** @type {import("jest").Config} **/
export default {
  ...tsJestPreset,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    // This resolves the ".js" extension in your imports back to ".ts" files
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    ...tsJestPreset.transform,
  },
};
