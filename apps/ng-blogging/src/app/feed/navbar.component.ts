import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  template: `<nav
    class="navbar bg-white border-bottom py-3 position-sticky sticky-top"
  >
    <div class="container d-flex align-items-center justify-content-between">
      <a
        class="navbar-brand fw-bold fs-4 mb-0 cursor-pointer"
        routerLink="blogs"
        >Blogging</a
      >

      <a class="link text-decoration-none" routerLink="/my-posts">My Posts</a>

      <div class="flex-grow-1 mx-4 d-flex justify-content-center">
        <div
          class="d-flex justify-content-center align-items-center w-100 w-md-50 w-lg-25 mx-auto mx-md-0"
        >
          <section class="w-100" style="max-width: 480px;">
            <input
              type="search"
              id="searchItem"
              class="form-control"
              placeholder="Search your posts here!"
            />
          </section>
        </div>
      </div>

      <section class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          class="btn btn-primary me-md-2"
          routerLink="/auth/login"
          type="button"
        >
          Login
        </button>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="profileMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Ajit Rana
          </button>
          <ul class="dropdown-menu" aria-labelledby="profileMenu">
            <li>
              <button class="dropdown-item" type="button">Profile</button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button class="dropdown-item" type="button">Sign out</button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </nav>`,
})
export class NavbarComponent {}
