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
      .post<any>(url, { user })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ({ user }) => {
          if (user) {
            // TODO: Replace localStorage & use another approach
            localStorage.setItem("token", user.token);
            this.router.navigate(["/articles"]);
          }
        },
        err =>
          this.toaster.open({
            type: "danger",
            caption: "Login Failed!",
            text: "User name and/or Password is invalid",
          }),
      );
  }

  register(user: RegisterModel) {
    const url = this.BASE_URL + "users";
    this.http
      .post(url, { user })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.toaster.open({
            type: "success",
            text: "You have registered successfully!",
          });
          this.router.navigate(["/login"]);
        },
        err =>
          this.toaster.open({
            type: "danger",
            caption: "Registeration Failed!",
            text: err.message,
          }),
      );
  }

  unsubscribeAll() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

interface LoginModel {
  email: string;
  password: string;
}

interface RegisterModel {
  username: string;
  email: string;
  password: string;
}
