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

export interface IKlesConfirmDialogData {
  message?: string;
  title?: string;
  icon?: string;
  buttonText?: {
    ok?: string;
    cancel?: string;
  };
  option?: IKlesDialogOptions;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [
    './confirm-dialog.component.scss',
    '../../../../styles/message-dialog.style.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, KlesDialogLayoutComponent],
})
export class ConfirmDialogComponent extends KlesDialogAbstractComponent {
  title: string | undefined;
  message = '';
  confirmButtonText = 'yes';
  cancelButtonText = 'cancel';
  icon: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IKlesConfirmDialogData | null,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
    super(dialogRef);
    if (data) {
      this.message = data.message || this.message;
      this.title = data.title;
      this.icon = data.icon;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
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

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
