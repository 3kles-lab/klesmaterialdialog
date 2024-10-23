import { signal } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


export interface IKlesDialogComponent {
    toggleFullsize(): void;
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
        this.dialogRef.addPanelClass('dialog-fullsize');
        this.dialogRef.updateSize('100vw', '100vh');
        this.fullsize.set(true);
    }

    public closeFullsize() {
        this.dialogRef.updateSize('auto', 'auto');
        this.dialogRef.removePanelClass('dialog-fullsize');
        this.dialogRef.updatePosition();
        this.fullsize.set(false);
    }

}
