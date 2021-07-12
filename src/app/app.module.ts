import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { ToastNotificationsModule } from "./shared/toast-notification";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ToastNotificationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
