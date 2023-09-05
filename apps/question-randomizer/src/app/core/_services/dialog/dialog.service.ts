import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable()
export class DialogService {
  defaultConfigDialog: MatDialogConfig = {
    enterAnimationDuration: 0,
    exitAnimationDuration: 0,
    // hasBackdrop: false,
    // panelClass: ['panel-overlay', 'animate__animated', 'animate__slideInRight'],
    // disableClose: true,
    // width: '860px',
    // height: '100%',
    // position: {
    //   right: '0',
    // },
  };

  constructor(private _dialog: MatDialog) {}

  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {
    return this._dialog.open<T, D>(component, {
      ...this.defaultConfigDialog,
      ...config,
    });
  }
}
