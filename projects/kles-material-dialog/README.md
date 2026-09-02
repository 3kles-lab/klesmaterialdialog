# @3kles/kles-material-dialog
@3kles/kles-material-dialog is a angular library to create dialog.

## Changelog

Check out the [changelog](./CHANGELOG.md) to check all the latest changes.

## Models

### Components

- <b>AlertDialogComponent</b> -> Component to create an alert dialog
- <b>ConfirmDialogComponent</b> -> Component to create a confirm dialog
- <b>SpinnerDialogComponent</b> -> Component to create a spinner dialog
- <b>KlesDynamicFormDialogComponent</b> -> Component to create a dialog with a form
- <b>KlesDialogLayoutComponent</b> -> Standalone layout for custom dialogs

## Install

### npm

```
npm install --save @3kles/kles-material-dialog
```

## How to use

```javascript
constructor(protected dialog: MatDialog) {}

open(): void {
    this.dialog.open(DialogComponent, {
        data: {
            ...
        },
        ...
    });
}
```

Check the [`documentation`](https://doc.3kles-consulting.com/#/material/dialog) to use component and directive.

## Custom dialog with a dynamic form

`KlesDialogLayoutComponent` exposes six projection zones: `klesDialogTitle`,
`klesDialogTitleContent`, `klesDialogContent`, `klesDialogStatus`,
`klesDialogActionsStart` and `klesDialogActionsEnd`. The content is scrollable;
the status and actions remain together in a fixed footer.

The additional title content is right-aligned by default. Use
`titleContentAlign` to place it at the start, center or end of the available
title row:

```html
<kles-dialog-layout titleContentAlign="center">
  <span klesDialogTitle>Connection</span>
  <span klesDialogTitleContent>Environment: production</span>
</kles-dialog-layout>
```

The following custom dialog keeps the domain-specific "test connection" action
in the application while reusing the library layout and
`KlesDynamicFormComponent`.

```ts
import { Component, ViewChild } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  IKlesFieldConfig,
  KlesDynamicFormComponent,
  KlesFormInputComponent,
  KlesMaterialDynamicformsModule,
} from '@3kles/kles-material-dynamicforms';
import {
  KlesDialogAbstractComponent,
  KlesDialogLayoutComponent,
} from '@3kles/kles-material-dialog';
import { finalize } from 'rxjs/operators';
import { ConnectionService } from './connection.service';

@Component({
  selector: 'app-connection-dialog',
  standalone: true,
  imports: [
    KlesDialogLayoutComponent,
    KlesMaterialDynamicformsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './connection-dialog.component.html',
})
export class ConnectionDialogComponent extends KlesDialogAbstractComponent {
  @ViewChild(KlesDynamicFormComponent, { static: true })
  dynamicForm!: KlesDynamicFormComponent;

  active = true;
  testing = false;
  status?: { kind: 'success' | 'error'; message: string };
  fields: IKlesFieldConfig[] = [
    {
      component: KlesFormInputComponent,
      name: 'host',
      label: 'Host',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Host is required',
        },
      ],
    },
  ];

  constructor(
    dialogRef: MatDialogRef<ConnectionDialogComponent>,
    private readonly connections: ConnectionService,
  ) {
    super(dialogRef);
    this.fullsizeButton.set(true);
  }

  testConnection(): void {
    if (!this.validateForm()) return;

    this.testing = true;
    this.status = undefined;
    this.connections
      .test({ ...this.dynamicForm.form.getRawValue(), active: this.active })
      .pipe(finalize(() => (this.testing = false)))
      .subscribe({
        next: () =>
          (this.status = { kind: 'success', message: 'Connection successful' }),
        error: () =>
          (this.status = { kind: 'error', message: 'Connection failed' }),
      });
  }

  save(): void {
    if (!this.validateForm()) return;
    this.dialogRef.close({
      ...this.dynamicForm.form.getRawValue(),
      active: this.active,
    });
  }

  private validateForm(): boolean {
    this.dynamicForm.form.markAllAsTouched();
    return this.dynamicForm.form.valid;
  }
}
```

```html
<kles-dialog-layout
  icon="settings_ethernet"
  [fullsize]="fullsize()"
  [fullsizeButton]="fullsizeButton()"
  (fullsizeToggle)="toggleFullsize()"
>
  <span klesDialogTitle>Connection</span>

  <app-kles-dynamic-form klesDialogContent [fields]="fields" />

  @if (status; as result) {
    <div klesDialogStatus [class.connection-success]="result.kind === 'success'"
      [class.connection-error]="result.kind === 'error'">
      {{ result.message }}
    </div>
  }

  <mat-slide-toggle klesDialogActionsStart [(ngModel)]="active">
    Active
  </mat-slide-toggle>

  <div klesDialogActionsEnd>
    <button mat-button type="button" mat-dialog-close>Annuler</button>
    <button mat-button type="button" [disabled]="testing" (click)="testConnection()">
      Tester la connexion
      @if (testing) { <mat-spinner diameter="18" /> }
    </button>
    <button mat-flat-button type="button" [disabled]="testing" (click)="save()">
      Enregistrer
    </button>
  </div>
</kles-dialog-layout>
```

`testConnection()` does not call `dialogRef.close()`: the dialog therefore stays
open while the test runs and when its result is displayed.

## Tests

```
npm install
npm test
```

## License

[`MIT`](./LICENSE.md)
