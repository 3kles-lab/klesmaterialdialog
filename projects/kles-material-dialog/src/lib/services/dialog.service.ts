import { Injectable, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
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
