import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UNDEFINED_USER, User } from "src/app/core/models";
import { Toaster } from "src/app/shared/toast-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly BASE_URL = environment.baseURL;
  private _currentUser = new BehaviorSubject<User>(UNDEFINED_USER);
  private unsubscribe = new Subject();

  constructor(
    private router: Router,
    private toaster: Toaster,
    private http: HttpClient,
  ) {
    this._currentUser.subscribe(x => console.log(x));
  }

  public get currentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }

  login(user: LoginModel) {
    const url = this.BASE_URL + "users/login";
    this.http
      .post<{ user: User }>(url, { user })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ({ user }) => {
          if (user) {
            // TODO: Replace localStorage & use another approach
            localStorage.setItem("token", user.token);
            this._currentUser.next(user);
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

  getUser() {
    const url = this.BASE_URL + "user";
    const token = localStorage.getItem("token");
    if (token) {
      const headers = new HttpHeaders({
        Authorization: "Token " + token,
      });
      this.http
        .get<{ user: User }>(url, { headers })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(({ user }) => this._currentUser.next(user));
    }
  }

  logout() {
    localStorage.clear();
    this._currentUser.next(null);
    this.router.navigate(["/login"]);
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
