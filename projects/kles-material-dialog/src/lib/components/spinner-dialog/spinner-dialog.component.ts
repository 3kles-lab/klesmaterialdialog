import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KlesDialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

@Component({
  templateUrl: 'spinner-dialog.component.html',
  styles: `
    .kles-spinner-dialog__content {
      display: grid;
      justify-items: center;
      gap: 16px;
      width: 100%;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule, KlesDialogLayoutComponent],
})
export class SpinnerDialogComponent<TData = any> extends KlesDialogAbstractComponent {
  constructor(
    public dialogRef: MatDialogRef<SpinnerDialogComponent<TData>>,
    @Inject(MAT_DIALOG_DATA) public data: TData,
  ) {
    super(dialogRef);
  }
}
