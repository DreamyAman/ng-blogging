import { Route } from "@angular/router";

export const blogRoutes: Route[] = [
  {
    path: "new",
    loadComponent: () =>
      import("./create-blog/create-blog.component").then(
        (c) => c.CreateBlogComponent,
      ),
  },

  // {
  //   path: "edit",
  //   component: void 0,
  // },
  {
    path: "my-blogs",
    loadComponent: () =>
      import("./my-blogs/my-blogs.component").then((c) => c.MyBlogsComponent),
  },
] as const;
