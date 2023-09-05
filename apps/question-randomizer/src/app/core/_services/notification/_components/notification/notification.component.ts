import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface Notification {
  message: string;
}

@Component({
  selector: 'my-projects-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) {}
}
