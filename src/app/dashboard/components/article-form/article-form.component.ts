import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseService } from "src/app/core/services";

@Component({
  selector: "r1c-article-form",
  templateUrl: "./article-form.component.html",
  styleUrls: ["./article-form.component.scss"],
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  @Input() isEditMode: boolean = false;

  form: FormGroup;
  tags: string[];
  loading: boolean = false;
  private unsubscribe = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private baseService: BaseService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (!this.isEditMode) {
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

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.baseService.post$("articles", this.form.value).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(["/articles"]);
        },
        err => {
          this.loading = false;
          console.log(err);
        },
      );
    }
  }

  getTagList() {
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
