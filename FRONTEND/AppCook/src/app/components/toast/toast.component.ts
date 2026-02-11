import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Store } from '@ngxs/store';
import { ToastState } from '../../store/toast/toast.state';
import { ClearToasts } from '../../store/toast/toast.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  template: `<p-toast position="top-right"></p-toast>`,
  styles: [`:host { display: block; }`]
})
export class ToastComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  constructor(
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit() {
    this.sub = this.store.select(ToastState.messages).subscribe(messages => {
      if (messages && messages.length > 0) {
        const latest = messages[messages.length - 1];
        this.messageService.add({
          severity: latest.severity,
          summary: latest.summary,
          detail: latest.detail,
          life: latest.life
        });
        this.store.dispatch(new ClearToasts());
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
