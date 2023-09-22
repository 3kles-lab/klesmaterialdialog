import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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
