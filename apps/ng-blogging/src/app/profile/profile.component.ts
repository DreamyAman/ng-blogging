import { Component, inject, OnInit, signal } from "@angular/core";
import { ProfileApiService } from "./services/profile-api.service";
import { AuthService } from "../auth/services/auth.service";
import { IUser } from "../common/types";
import { AlertService } from "../common/alert/services";
import { startWithTap } from "../common/rxjs/operators";
import { finalize } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
  providers: [ProfileApiService],
})
export class ProfileComponent implements OnInit {
  public readonly profileApi = inject(ProfileApiService);

  public readonly auth = inject(AuthService);

  public readonly profile = signal<IUser | null>(null);

  public readonly isLoading = signal<boolean>(true);

  private readonly alert = inject(AlertService);

  ngOnInit(): void {
    this.profileApi
      .getProfile()
      .pipe(
        startWithTap(() => {
          this.isLoading.set(true);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (resp) => this.profile.set(resp.data),
        error: (error) => this.alert.error("Failed", error?.message),
      });
  }
}
