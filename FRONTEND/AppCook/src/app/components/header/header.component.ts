import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false; // TODO: connect to auth state

  constructor(private router: Router) {}

  logout() {
    // TODO: call logout logic
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
