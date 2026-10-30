import { Component, input } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    @if (isLoading()) {
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    }
  `,
})
export class LoaderComponent {
  public isLoading = input<boolean>(true);
}
