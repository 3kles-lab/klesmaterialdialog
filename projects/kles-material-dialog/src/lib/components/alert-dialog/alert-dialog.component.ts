import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './alert-dialog.component.html',
    styles:['mat-icon { vertical-align: middle; }']
})
export class AlertDialogComponent {
    message = '';
    cancelButtonText = 'cancel';
    title: string;
    icon: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AlertDialogComponent>) {
        if (data) {
            this.message = data.message || this.message;
            this.title = data.title;
            this.icon = data.icon;
            if (data.buttonText) {
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }
}
