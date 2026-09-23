import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  // {
  //   path: "feed",

  // },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.routes").then((m) => m.authRoutes),
  },
];
