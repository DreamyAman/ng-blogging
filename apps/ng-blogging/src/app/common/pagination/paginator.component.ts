import { Component, computed, input, output } from "@angular/core";
import { IPageSize } from "../types";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-paginator",
  template: `
    @if (pageCountList().length > 1) {
      <nav aria-label="paginator">
        <ul class="pagination">
          <li
            class="page-item"
            [ngClass]="page()?.hasPrevPage ? '' : 'disabled'"
          >
            <button
              class="page-link"
              (click)="getPage(currentPage() - 1)"
              tabindex="-1"
              aria-disabled="true"
            >
              Previous
            </button>
          </li>

          @for (page of pageCountList(); track page) {
            <li
              class="page-item"
              [ngClass]="currentPage() === page ? 'active' : ''"
            >
              <button class="page-link" (click)="getPage(page)">
                {{ page }}
              </button>
            </li>
          }

          <li
            class="page-item"
            [ngClass]="page()?.hasNextPage ? '' : 'disabled'"
          >
            <button class="page-link" (click)="getPage(currentPage() + 1)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    }
  `,
  imports: [NgClass],
})
export class PaginatorComponent {
  public page = input<IPageSize>();

  public currentPage = computed(() => this.page()?.page || 1);

  public pageChanged = output<number>();

  public pageCountList = computed(() => {
    const size = Math.max(this.page()?.size || 0, 0);
    const totalRecords = Math.max(this.page()?.totalRecords || 0, 0);

    const total = Math.max(totalRecords / size);

    return Array.from({ length: total }, (_, index) => index + 1);
  });

  protected getPage(pageRequested: number) {
    if (this.currentPage() === pageRequested) {
      return;
    }

    const totalPages = this.pageCountList().length; // total pages possible

    if (pageRequested < 1 && pageRequested > totalPages) {
      return;
    }

    this.pageChanged.emit(pageRequested);
  }
}
