import { Route } from "@angular/router";
import { BlankLayout } from "../layouts/blank-layout";

export const authRoutes: Route[] = [
  {
    path: "",
    component: BlankLayout,
    children: [
      {
        path: "register",
        loadComponent: () =>
          import("./register/register.component").then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: "login",
        loadComponent: () =>
          import("./login/login.component").then((m) => m.LoginComponent),
      },
    ],
  },
] as const;
