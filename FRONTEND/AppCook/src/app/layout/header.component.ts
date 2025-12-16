import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
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
