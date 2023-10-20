import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styles: [],
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild("authForm", { static: false }) slForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  lastUpdated = new Date();

  userInfo: User | null = null;

  constructor(private srvApi: ApiService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.userInfo = this.srvApi.getUserInfo();
    if (
      typeof this.userInfo === "object" &&
      this.userInfo !== null &&
      "email" in this.userInfo
    ) {
      setTimeout(() => {
        if (this.userInfo) {
          this.lastUpdated = this.userInfo.lastUpdated;
          this.slForm.setValue({
            email: this.userInfo.email,
            token: this.userInfo.pat,
          });
        }
      });
    }
  }

  onUpdateMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onDeleteInfoMode(form: NgForm) {
    this.srvApi.ClearUserInfo();
    form.reset();
  }

  onSubmit(form: NgForm) {
    const currentDate = new Date();
    this.userInfo = new User(
      form.value.email,
      form.value.token,
      currentDate,
      false,
      ""
    );
    if (!form.valid) {
      return;
    }
    this.srvApi.UpdateUserInfo(this.userInfo);
    this.lastUpdated = currentDate;
    form.reset();
  }

  onHandleError() {}
}
