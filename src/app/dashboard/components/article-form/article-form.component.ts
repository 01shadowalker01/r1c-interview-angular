import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r1c-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
