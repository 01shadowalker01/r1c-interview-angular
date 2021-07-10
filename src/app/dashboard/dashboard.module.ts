import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ArticleFormComponent } from "./components/article-form/article-form.component";
import { TagListComponent } from "./components/tag-list/tag-list.component";
import { ArticleListComponent } from "./components/article-list/article-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardRoutingModule } from "./dashboard.routing";

@NgModule({
  declarations: [
    DashboardComponent,
    ArticleFormComponent,
    TagListComponent,
    ArticleListComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
