import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "r1c-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.userService.login(this.form.value);
    }
  }

  ngOnDestroy() {
    this.userService.unsubscribeAll();
  }
}
