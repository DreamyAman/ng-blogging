import { IEnvironment } from "./environment.type";
import { createPrefixBasedKey } from "./utils";

export const environment: IEnvironment = {
  apiBaseUrl: "https://stg.ng-blogging.com/api",
  platformPrefix: createPrefixBasedKey(),
};
