import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Toaster } from "src/app/shared/toast-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly BASE_URL = environment.baseURL;
  private unsubscribe = new Subject();

  constructor(
    private router: Router,
    private toaster: Toaster,
    private http: HttpClient,
  ) {}

  login(user: LoginModel) {
    const url = this.BASE_URL + "users/login";
    this.http
      .post(url, { user })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.router.navigate(["/articles"]);
        },
        err =>
          this.toaster.open({
            type: "danger",
            caption: "Login Failed!",
            text: "User name and/or Password is invalid",
          }),
      );
  }

  register() {}

  unsubscribeAll() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

interface LoginModel {
  email: string;
  password: string;
}
