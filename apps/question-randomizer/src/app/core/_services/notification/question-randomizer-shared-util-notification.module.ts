import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';
import { NotificationComponent } from './_components/notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatSnackBarModule],
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<NotificationModule> {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService],
    };
  }
}
