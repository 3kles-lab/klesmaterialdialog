import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';

@Component({
    templateUrl: 'spinner-dialog.component.html',
})
export class SpinnerDialogComponent extends KlesDialogAbstractComponent {

    constructor(public dialogRef: MatDialogRef<SpinnerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef);
    }

}

