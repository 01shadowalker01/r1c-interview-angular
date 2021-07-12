import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/auth/shared/user.service";

@Component({
  selector: "r1c-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser();
  }

  onLogout() {
    this.userService.logout();
  }
}
