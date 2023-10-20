import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  constructor() {}

  ngOnInit() {}

  onSaveData() {}

  onFetchData() {}

  onLogout() {}

  ngOnDestroy() {}
}
