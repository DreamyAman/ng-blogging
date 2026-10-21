import { Route } from "@angular/router";
import { FeedComponent } from "./feed.component";

export const feedRoutes: Route[] = [
  {
    path: "",
    component: FeedComponent,
  },
] as const;
