import { IEnvironment } from "./environment.type";
import { createPrefixBasedKey } from "./utils/env.utils";

export const environment: IEnvironment = {
  apiBaseUrl: "https://ng-blogging.com/api",
  platformPrefix: createPrefixBasedKey(),
};
