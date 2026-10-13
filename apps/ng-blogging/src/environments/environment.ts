import { IEnvironment } from "./environment.type";
import { createPrefixBasedKey } from "./utils";

export const environment: IEnvironment = {
  apiBaseUrl: "http://localhost:3000",
  platformPrefix: createPrefixBasedKey(),
};
