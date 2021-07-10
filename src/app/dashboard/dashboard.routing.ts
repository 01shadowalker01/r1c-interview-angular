import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleFormComponent } from "./components/article-form/article-form.component";
import { ArticleListComponent } from "./components/article-list/article-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: ArticleListComponent },
      { path: "create", component: ArticleFormComponent },
      { path: "edit", component: ArticleFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
