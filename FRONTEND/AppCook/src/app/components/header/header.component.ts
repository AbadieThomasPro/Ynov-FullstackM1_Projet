import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../../store/user/user.state';
import { Logout } from '../../store/user/user.actions';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import type { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;
  currentUser$!: Observable<any>;

  dropdownOpen = false;

  profileItems: MenuItem[] = [];

  constructor(private store: Store, private router: Router) {
    this.isAuthenticated$ = this.store.select(UserState.isAuthenticated);
    this.currentUser$ = this.store.select(UserState.currentUser);

    this.profileItems = [
      { label: 'Profile', icon: 'pi pi-user', command: () => this.router.navigate(['/profile']) },
      { label: 'Recette', icon: 'pi pi-book', command: () => this.router.navigate(['/recipes']) },
      { label: 'Statistique', icon: 'pi pi-chart-bar', command: () => this.router.navigate(['/stats']) },
      { separator: true },
      { label: 'Déconnexion', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
