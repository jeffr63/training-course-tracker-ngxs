import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-callback",
  template: `
    <div class="loading">
      <img src="assets/loading.svg" alt="loading" />
    </div>
  `,
  styleUrls: ["./callback.component.scss"],
})
export class CallbackComponent {
  constructor() {}
}
