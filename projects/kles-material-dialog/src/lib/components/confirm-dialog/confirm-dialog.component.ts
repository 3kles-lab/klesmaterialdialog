import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: [
        './confirm-dialog.component.scss',
        '../../../../styles/title.style.scss',
        '../../../../styles/fullsize.style.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent extends KlesDialogAbstractComponent {

    title: string;
    message = '';
    confirmButtonText = 'yes';
    cancelButtonText = 'cancel';
    icon: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
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
                this.fullsizeButton.set(data.option.fullsizeButton || false)
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}
