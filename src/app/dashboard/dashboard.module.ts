import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PostListComponent,
    ArticleFormComponent,
    TagListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
