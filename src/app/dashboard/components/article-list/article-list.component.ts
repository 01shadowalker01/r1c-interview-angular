import { Component, Input, OnInit } from "@angular/core";
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

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articles$ = this.baseService
      .get$("articles")
      .pipe(map(({ articles }) => articles));
  }
}
