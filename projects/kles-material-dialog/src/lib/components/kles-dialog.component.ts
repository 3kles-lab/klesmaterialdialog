import { signal } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


export interface IKlesDialogComponent {
    toggleFullsize(): void;
}

export interface IKlesDialogOptions {
    fullsizeButton?: boolean;
    fullsize?: boolean;
    closeButton?: boolean;
    closeButtonAriaLabel?: string;
}

export abstract class KlesDialogAbstractComponent implements IKlesDialogComponent {
    public fullsize = signal(false);
    public fullsizeButton = signal(false);
    public closeButton = signal(false);
    public closeButtonAriaLabel = signal<string | undefined>(undefined);

    constructor(public dialogRef: MatDialogRef<KlesDialogAbstractComponent>) { }

    protected applyDialogOptions(options?: IKlesDialogOptions): void {
        if (options?.fullsize) {
            this.setFullsize();
        }
        this.fullsizeButton.set(options?.fullsizeButton ?? false);
        this.closeButton.set(options?.closeButton ?? false);
        this.closeButtonAriaLabel.set(options?.closeButtonAriaLabel);
    }

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
