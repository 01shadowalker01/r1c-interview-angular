import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseService } from "src/app/core/services";
import { Toaster } from "src/app/shared/toast-notification";

@Component({
  selector: "r1c-article-form",
  templateUrl: "./article-form.component.html",
  styleUrls: ["./article-form.component.scss"],
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tags: string[];
  loading: boolean = false;
  isEditMode: boolean = false;
  private unsubscribe = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public toaster: Toaster,
    private route: ActivatedRoute,
    private baseService: BaseService,
  ) {
    this.initForm();
    this.getFormMode();
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getArticle();
    } else {
      this.getTagList();
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      body: [null, Validators.required],
    });
  }

  getFormMode() {
    this.isEditMode = this.route.snapshot.url[0].path == "edit";
  }

  getArticle() {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get("slug");
    if (slug) {
      this.baseService
        .get$("articles/" + slug)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(({ article }) => {
          this.loading = false;
          this.form.setValue({
            title: article.title,
            description: article.description,
            body: article.body,
          });
        });
    } else {
      this.router.navigate(["/articles"]);
      this.toaster.open({
        type: "danger",
        caption: "Error happend",
        text: "Article not found",
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      if (this.isEditMode) {
        const slug = this.route.snapshot.paramMap.get("slug");
        this.baseService
          .put$("articles/" + slug, this.form.value)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(
            this.onSubmitSuccess.bind(this),
            this.onSubmitFailure.bind(this),
          );
      } else {
        this.baseService
          .post$("articles", this.form.value)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(
            this.onSubmitSuccess.bind(this),
            this.onSubmitFailure.bind(this),
          );
      }
    }
  }

  private onSubmitSuccess() {
    this.loading = false;
    this.router.navigate(["/articles"]);
    const message = `Well done! Article ${
      this.isEditMode ? "updated" : "created"
    } successfuly`;
    this.toaster.open({
      type: "success",
      text: message,
    });
  }

  private onSubmitFailure(err) {
    this.loading = false;
    this.toaster.open({
      type: "danger",
      caption: "Error happend",
      text: err.message,
    });
  }

  private getTagList() {
    this.baseService
      .get$("tags")
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ tags }) => (this.tags = tags));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
