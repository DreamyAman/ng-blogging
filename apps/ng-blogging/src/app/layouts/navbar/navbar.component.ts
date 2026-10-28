import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-navbar",
  imports: [RouterLink, TitleCasePipe],
  templateUrl: "navbar.component.html",
})
export class NavbarComponent {
  public readonly auth = inject(AuthService);
}
