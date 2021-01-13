import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class DialogService<T> {

    dialogRef: MatDialogRef<T>;

    constructor(private dialog: MatDialog, @Inject('componentType') private componentType: ComponentType<T>) {

    }

    open(options?) {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        this.dialogRef = this.dialog.open(this.componentType, options);
    }

    close() {
        this.dialogRef.close();
    }

}
