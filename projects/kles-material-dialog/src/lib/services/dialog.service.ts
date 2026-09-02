import { Injectable, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class DialogService<T, TData = any, TResult = any> {
    dialogRef!: MatDialogRef<T, TResult>;

    constructor(private dialog: MatDialog, @Inject('componentType') private componentType: ComponentType<T>) { }

    open(options?: MatDialogConfig<TData>): void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        this.dialogRef = this.dialog.open<T, TData, TResult>(this.componentType, options);
    }

    close(result?: TResult): void {
        this.dialogRef.close(result);
    }
}
