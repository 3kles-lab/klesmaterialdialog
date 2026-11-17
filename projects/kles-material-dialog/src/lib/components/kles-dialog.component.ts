import { signal } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


export interface IKlesDialogComponent {
    toggleFullsize(): void;
}

export interface IKlesDialogOptions {
    fullsizeButton?: boolean;
    fullsize?: boolean;
}

export abstract class KlesDialogAbstractComponent implements IKlesDialogComponent {
    public fullsize = signal(false);
    public fullsizeButton = signal(false);

    constructor(public dialogRef: MatDialogRef<KlesDialogAbstractComponent>) { }

    public toggleFullsize(): void {
        if (!this.fullsize()) {
            this.setFullsize();
        } else {
            this.closeFullsize();
        }
    }

    public setFullsize() {
        // The panel class overrides the dialog dimensions while it is full screen.
        this.dialogRef.addPanelClass('dialog-fullsize');
        this.fullsize.set(true);
    }

    public closeFullsize() {
        this.dialogRef.removePanelClass('dialog-fullsize');
        this.dialogRef.updatePosition();
        this.fullsize.set(false);
    }
}
