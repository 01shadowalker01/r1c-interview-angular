import { Component, OnInit, Renderer2 } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Article } from "src/app/core/models";
import { BaseService } from "src/app/core/services";
import { Toaster } from "src/app/shared/toast-notification";

@Component({
  selector: "r1c-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(
    private toaster: Toaster,
    private renderer: Renderer2,
    private baseService: BaseService,
  ) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articles$ = this.baseService
      .get$("articles")
      .pipe(map(({ articles }) => articles));
  }

  toggleDropdown(dropdown) {
    if (dropdown) {
      if (dropdown.classList.value.includes("show")) {
        this.renderer.removeClass(dropdown, "show");
      } else {
        this.renderer.addClass(dropdown, "show");
      }
    }
  }

  onDelete(article: Article) {
    // TODO: confirm should bebbbeb replaced by a modal
    if (confirm("Are you sure to delete Article?")) {
      this.baseService.delete$("articles/" + article.slug).subscribe(
        () => {
          this.toaster.open({
            type: "success",
            text: "Article deleted successfuly",
          });
          this.getArticles();
        },
        err => {
          this.toaster.open({
            type: "danger",
            text: err.message,
          });
        },
      );
    }
  }
}
