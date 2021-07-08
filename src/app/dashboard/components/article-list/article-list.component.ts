import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/core/models";

@Component({
  selector: "r1c-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Article[] = [];

  constructor() {}

  ngOnInit(): void {}
}
