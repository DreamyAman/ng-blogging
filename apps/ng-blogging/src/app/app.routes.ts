import { Route } from "@angular/router";
import { NavLayout } from "./layouts/nav-layout";

export const appRoutes: Route[] = [
  {
    path: "",
    component: NavLayout,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./feed/feed.component").then((c) => c.FeedComponent),
      },
      {
        path: "profile",
        loadComponent: () =>
          import("./profile/profile.component").then((c) => c.ProfileComponent),
      },
      {
        path: "blog",
        loadChildren: () =>
          import("./blog/blog.routes").then((m) => m.blogRoutes),
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.routes").then((m) => m.authRoutes),
  },
  {
    path: "feed",
    redirectTo: "",
    pathMatch: "full",
  },
];
