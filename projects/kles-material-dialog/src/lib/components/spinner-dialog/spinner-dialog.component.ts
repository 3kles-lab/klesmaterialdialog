import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    templateUrl: 'spinner-dialog.component.html',
    standalone: true,
    imports: [
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})
export class SpinnerDialogComponent extends KlesDialogAbstractComponent {
    constructor(public dialogRef: MatDialogRef<SpinnerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef);
    }
}
