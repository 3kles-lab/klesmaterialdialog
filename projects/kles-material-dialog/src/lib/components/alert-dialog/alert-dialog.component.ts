import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent {
    message = '';
    cancelButtonText = 'cancel';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AlertDialogComponent>) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }
}
