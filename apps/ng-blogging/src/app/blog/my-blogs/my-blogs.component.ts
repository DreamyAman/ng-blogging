import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BlogStatus, IBlogQueryParams, ISearchBlogResponse } from "../types";
import { Router, RouterLink } from "@angular/router";
import { AlertService } from "../../common/alert/services";
import { BlogApiService } from "../services/blog-api.service";
import { FALLBACK_PAGINATION_RESULT } from "../../common/types";
import { PaginatorComponent } from "../../common/pagination/paginator.component";
import { DatePipe } from "@angular/common";
import { startWithTap } from "../../common/rxjs/operators";
import { finalize } from "rxjs";
import { LoaderComponent } from "../../common/loader/loader.component";

@Component({
  imports: [
    ReactiveFormsModule,
    PaginatorComponent,
    RouterLink,
    DatePipe,
    LoaderComponent,
  ],
  selector: "app-create-blog",
  templateUrl: "./my-blogs.component.html",
})
export class MyBlogsComponent implements OnInit {
  public router = inject(Router);

  protected isLoading = signal(true);

  private readonly blogApi = inject(BlogApiService);

  private readonly alert = inject(AlertService);

  public readonly paginationResult = signal<ISearchBlogResponse>(
    FALLBACK_PAGINATION_RESULT,
  );

  protected readonly BlogStatus = BlogStatus;

  protected readonly blogs = computed(() => {
    return this.paginationResult().data ?? [];
  });

  ngOnInit() {
    this.search();
  }

  protected getPage(page: number) {
    this.search({
      page,
    });
  }

  protected search(params?: IBlogQueryParams) {
    this.blogApi
      .myBlogs(params)
      .pipe(
        startWithTap(() => {
          this.isLoading.set(true);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (paginationResult) => {
          this.paginationResult.set(paginationResult);
        },
        error: (err) => this.alert.error("Failed", err?.message),
      });
  }

  protected updateBlogStatus(id: string, status: BlogStatus) {
    this.blogApi.updateStatus(id, { status }).subscribe({
      next: (resp) => {
        this.alert.success(
          "Blog updated",
          `Blog ${resp.data.title} status updated successfully.`,
        );

        // also reload the page
        this.getPage(this.paginationResult().page);
      },
      error: (err) => this.alert.error("Status update failed", err.message),
    });
  }
}
