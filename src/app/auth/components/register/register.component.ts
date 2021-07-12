import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "r1c-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.userService.register(this.form.value);
    }
  }

  ngOnDestroy() {
    this.userService.unsubscribeAll();
  }
}
