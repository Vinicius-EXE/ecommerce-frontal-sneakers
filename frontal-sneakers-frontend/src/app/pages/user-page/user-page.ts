import { Component } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user-page',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
