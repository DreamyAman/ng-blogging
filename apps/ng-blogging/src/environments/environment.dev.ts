import { IEnvironment } from "./environment.type";
import { createPrefixBasedKey } from "./utils";

export const environment: IEnvironment = {
  apiBaseUrl: "https://dev.ng-blogging.com/api",
  platformPrefix: createPrefixBasedKey(),
};
