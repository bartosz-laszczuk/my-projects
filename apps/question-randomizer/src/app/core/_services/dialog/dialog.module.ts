import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [MatDialogModule],
  providers: [DialogService],
})
export class DialogModule {}
