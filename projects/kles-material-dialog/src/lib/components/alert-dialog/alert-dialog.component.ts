import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  IKlesDialogOptions,
  KlesDialogAbstractComponent,
} from '../kles-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { KlesDialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

export interface IKlesAlertDialogData {
  message?: string;
  title?: string;
  icon?: string;
  buttonText?: {
    cancel?: string;
  };
  option?: IKlesDialogOptions;
}

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: [
    '../../../../styles/message-dialog.style.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, KlesDialogLayoutComponent],
})
export class AlertDialogComponent extends KlesDialogAbstractComponent {
  message = '';
  cancelButtonText = 'cancel';
  title!: string;
  icon!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IKlesAlertDialogData | null,
    public dialogRef: MatDialogRef<AlertDialogComponent>,
  ) {
    super(dialogRef);
    if (data) {
      this.message = data.message || this.message;
      this.title = data.title;
      this.icon = data.icon;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if (data.option) {
        if (data.option.fullsize) {
          this.setFullsize();
        }
        this.fullsizeButton.set(data.option.fullsizeButton || false);
      }
    }
  }
}
