// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GetTest } from '../../store/test/test.actions';
import { TestState } from '../../store/test/test.state';
import { UserState } from '../../store/user/user.state';
import { Logout } from '../../store/user/user.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {


  constructor(private store: Store) {
    //Si je n'ai plus userId dans state on force le logout
    const current = this.store.selectSnapshot(UserState.currentUser);
    if (!current?.userid) {
      this.store.dispatch(new Logout());
    }
  }
}