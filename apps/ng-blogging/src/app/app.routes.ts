import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "feed",
    loadChildren: () => import("./feed/feed.routes").then((m) => m.feedRoutes),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.routes").then((m) => m.authRoutes),
  },
  {
    path: "",
    redirectTo: "/feed",
    pathMatch: "full",
  },
];
