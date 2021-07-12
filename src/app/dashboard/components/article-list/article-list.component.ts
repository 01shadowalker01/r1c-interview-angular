import { Component, OnInit, Renderer2 } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Article } from "src/app/core/models";
import { BaseService } from "src/app/core/services";

@Component({
  selector: "r1c-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private baseService: BaseService, private renderer: Renderer2) {}

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
}
