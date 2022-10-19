import { IKlesFieldConfig, KlesDynamicFormComponent, KlesFormCheckboxComponent, KlesFormColorComponent, KlesFormInputComponent, KlesFormLabelComponent } from '@3kles/kles-material-dynamicforms';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent, ConfirmDialogComponent, SpinnerDialogComponent } from 'kles-material-dialog';
import { IKlesDynamicFormDataDialog, KlesDynamicFormDialogComponent } from 'projects/kles-material-dialog/src/public-api';
import { delay, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testLib';
  fields: IKlesFieldConfig[];
  item: any;

  constructor(protected dialog: MatDialog) {
    this.fields = [
      {
        label: 'checkbox',
        name: '#select',
        component: KlesFormCheckboxComponent,
        indeterminate: false,
      },
      {
        component: KlesFormInputComponent,
        placeholder: 'beginvalue',
        inputType: 'number',
        name: 'beginvalue',
        disabled: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'statusSettings.beginvalue.validator.required'
          },
          {
            name: 'pattern',
            validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
            message: 'statusSettings.beginvalue.validator.notValid'
          }
        ]
      },
      {
        component: KlesFormInputComponent,
        placeholder: 'endvalue',
        inputType: 'number',
        name: 'endvalue',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'statusSettings.endValue.validator.required'
          },
          {
            name: 'pattern',
            validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
            message: 'statusSettings.endValue.validator.notValid'
          }
        ]
      },
      {
        component: KlesFormColorComponent,
        placeholder: 'color',
        name: 'color',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'statusSettings.color.validator.required'
          },
          {
            name: 'pattern',
            validator: Validators.pattern('^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$'),
            message: 'statusSettings.color.validator.notValid'
          }
        ]
      }
    ];

    this.item = { beginvalue: 11, endvalue: 10, color: '#ff67' };
  }


  openConfirmDialog(): MatDialogRef<ConfirmDialogComponent, any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: '350px',
      data: {
        message: "Message",
        confirmButtonText: "yes.text",
        cancelButtonText: "cancel.text"
      }
    });
    return dialogRef;
  }

  openAlertDialog(): MatDialogRef<AlertDialogComponent, any> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {
        message: "Message",
        cancelButtonText: "cancel.text"
      }
    });
    return dialogRef;
  }

  openSpinnerDialog(): MatDialogRef<SpinnerDialogComponent, any> {
    const dialogRef = this.dialog.open(SpinnerDialogComponent, {
      width: '350px',
      data: "Message...",

    });
    return dialogRef;
  }

  openDynamicFormDialog(): MatDialogRef<KlesDynamicFormDialogComponent, any> {
    const dialogRef = this.dialog.open(KlesDynamicFormDialogComponent, {
      //width: '350px',
      data: {
        fields: this.fields,
        item: this.item,
        title: 'Test title',
        //direction: 'row',
        buttonCancel: 'Annuler',
        buttonOK: 'Confirmer',
        beforeClose: (item, form) => {
          return of(form.value).pipe(delay(2000))
        }
      } as IKlesDynamicFormDataDialog

    });
    // dialogRef.componentInstance.onLoadedForm.subscribe(s => {
    //   dialogRef.componentInstance.getForm().valueChanges.subscribe(s => {
    //     console.log('Change Form=', s);
    //     dialogRef.componentInstance.getForm().controls['#select'].patchValue(true, { onlySelf: true, emitEvent: false });
    //   })
    // });

    dialogRef.afterClosed().subscribe(value => console.log(value))


    return dialogRef;
  }
}
