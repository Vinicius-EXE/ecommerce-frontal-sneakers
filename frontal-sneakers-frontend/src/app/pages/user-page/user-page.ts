import { Component } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-page',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  isSidebarCollapsed = false;
  user: any = {};

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.userService.getProfile().subscribe({
      next: (data) => { }, // Data is handled by the subscription above
      error: (err) => console.error('Error fetching profile', err)
    });
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
