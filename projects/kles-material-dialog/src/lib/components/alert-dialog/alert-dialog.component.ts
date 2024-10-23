import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';

@Component({
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['../../../../styles/title.style.scss',
        '../../../../styles/fullsize.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlertDialogComponent extends KlesDialogAbstractComponent {
    message = '';
    cancelButtonText = 'cancel';
    title: string;
    icon: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialogRef: MatDialogRef<AlertDialogComponent>) {
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
                this.fullsizeButton.set(data.option.fullsizeButton || false)
            }
        }
    }
}
