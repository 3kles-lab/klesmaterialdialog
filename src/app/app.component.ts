import {
  IKlesFieldConfig,
  KlesFormCheckboxComponent,
  KlesFormChipGridComponent,
  KlesFormElement,
  KlesFormImageUploadComponent,
  KlesFormInputComponent,
  KlesFormSelectComponent,
} from '@3kles/kles-material-dynamicforms';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {
  AlertDialogComponent,
  ConfirmDialogComponent,
  SpinnerDialogComponent,
} from 'kles-material-dialog';

import {
  IKlesDynamicFormDataDialog,
  KlesDynamicFormDialogComponent,
} from 'kles-material-dialog';
import { of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class AppComponent {
  title = 'testLib';
  fields: KlesFormElement[];
  item: any;

  constructor(
    protected dialog: MatDialog,
    private themeService: ThemeService,
  ) {
    this.themeService.apply();
    // this.fields = [
    //   {
    //     label: 'checkbox',
    //     name: '#select',
    //     component: KlesFormCheckboxComponent,
    //     indeterminate: false,
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'beginvalue',
    //     inputType: 'number',
    //     name: 'beginvalue',
    //     disabled: true,
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.beginvalue.validator.required',
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.beginvalue.validator.notValid',
    //       },
    //     ],
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required',
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid',
    //       },
    //     ],
    //   },
    //   /*{
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },
    //   {
    //     component: KlesFormInputComponent,
    //     placeholder: 'endvalue',
    //     inputType: 'number',
    //     name: 'endvalue',
    //     validations: [
    //       {
    //         name: 'required',
    //         validator: Validators.required,
    //         message: 'statusSettings.endValue.validator.required'
    //       },
    //       {
    //         name: 'pattern',
    //         validator: Validators.pattern('^([0-9][0-9]{0,2}|1000)$'),
    //         message: 'statusSettings.endValue.validator.notValid'
    //       }
    //     ]
    //   },*/
    // ];

    this.fields = [
      {
        name: 'profilePhoto',
        component: KlesFormImageUploadComponent,
        label: 'Photo de profil',
        hint: 'Image JPEG, PNG ou WebP de 2 Mo maximum.',
        imageAlt: 'Photo de profil',
        accept: 'image/jpeg,image/png,image/webp',
        imageUploadOptions: {
          maxFileSize: 2 * 1024 * 1024,
        },
        layout: { colSpan: 12 },
      },
      { type: 'divider' },
      {
        type: 'section',
        title: 'Informations du compte',
        icon: 'person',
        fields: [
          {
            name: 'accountEmail',
            appearance: 'outline',
            component: KlesFormInputComponent,
            inputType: 'email',
            label: 'Email',
            icon: 'email',
            disabled: true,
            layout: { colSpan: 12 },
          },
          {
            name: 'accountFirstname',
            appearance: 'outline',
            component: KlesFormInputComponent,
            label: 'Prénom',
            icon: 'person',
            layout: { colSpan: 6, responsive: { xs: { colSpan: 12 } } },
          },
          {
            name: 'accountLastname',
            component: KlesFormInputComponent,
            label: 'Nom',
            icon: 'badge',
            appearance: 'outline',
            layout: { colSpan: 6, responsive: { xs: { colSpan: 12 } } },
          },
          {
            name: 'accountPhone',
            component: KlesFormInputComponent,
            inputType: 'tel',
            appearance: 'outline',
            label: 'Téléphone',
            icon: 'phone',
            layout: { colSpan: 12 },
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'section',
        title: 'Préférences',
        icon: 'tune',
        fields: [
          {
            name: 'language',
            component: KlesFormSelectComponent,
            appearance: 'outline',
            label: 'Langue',
            options: ['fr-FR', 'en-US'],
            layout: { colSpan: 4, responsive: { xs: { colSpan: 12 } } },
          },
          {
            name: 'timezone',
            component: KlesFormSelectComponent,
            label: 'Fuseau horaire',
            appearance: 'outline',
            options: ['UTC+00:00 — UTC', 'UTC+01:00 — Paris'],
            layout: { colSpan: 4, responsive: { xs: { colSpan: 12 } } },
          },
          {
            name: 'theme',
            component: KlesFormSelectComponent,
            label: 'Thème',
            appearance: 'outline',
            options: ['light', 'dark'],
            layout: { colSpan: 4, responsive: { xs: { colSpan: 12 } } },
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'section',
        title: 'Workspaces',
        icon: 'group',
        fields: [
          {
            name: 'attachedWorkspaces',
            component: KlesFormChipGridComponent,
            label: 'Workspaces rattachés',
            appearance: 'outline',
            options: ['PROD Logistique', 'PROD'],
            layout: { colSpan: 12 },
          },
          {
            name: 'defaultWorkspace',
            component: KlesFormSelectComponent,
            label: 'Workspace par défaut',
            appearance: 'outline',
            options: ['PROD Logistique', 'PROD'],
            hint: 'Le workspace par défaut doit faire partie des workspaces rattachés.',
            layout: { colSpan: 12 },
          },
        ],
      },
    ];

    this.item = {
      accountEmail: 'c.dasilvacosta@3kles-consulting.com',
      defaultWorkspace: 'PROD Logistique',
      theme: 'light',
      timezone: 'UTC+00:00 — UTC',
      language: 'fr-FR',
      accountLastname: 'da silva',
      accountFirstname: 'charles',
    };
  }

  toggle() {
    this.themeService.toggle();
  }

  openConfirmDialog(): MatDialogRef<ConfirmDialogComponent, any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: '350px',

      data: {
        message: 'Message',
        confirmButtonText: 'yes.text',
        cancelButtonText: 'cancel.text',
        title: 'aaaa',
        icon: 'warning',
        option: {
          fullsize: false,
          fullsizeButton: true,
        },
      },
    });
    return dialogRef;
  }

  openAlertDialog(): MatDialogRef<AlertDialogComponent, any> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {
        title: 'Title',
        message: 'Message',
        cancelButtonText: 'cancel.text',
        icon: 'warning',
        option: {
          fullsize: false,
          fullsizeButton: true,
        },
      },
    });
    return dialogRef;
  }

  openSpinnerDialog(): MatDialogRef<SpinnerDialogComponent, any> {
    const dialogRef = this.dialog.open(SpinnerDialogComponent, {
      width: '350px',
      data: 'Message...',
    });
    return dialogRef;
  }

  openDynamicFormDialog(): MatDialogRef<KlesDynamicFormDialogComponent, any> {
    const dialogRef = this.dialog.open(KlesDynamicFormDialogComponent, {
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - 32px)',
      autoFocus: 'dialog',
      data: {
        fields: this.fields,
        item: this.item,
        title: `Modifier ${this.item.accountFirstname} ${this.item.accountLastname}`,
        //direction: 'row',
        buttonCancel: 'Annuler',
        buttonOK: 'Confirmer',
        // icon: 'warning',
        option: {
          fullsize: false,
          fullsizeButton: false,
        },
        beforeClose: (item, form) => {
          return of(form.value).pipe(
            delay(200),
            switchMap(() => {
              return throwError(() => ({ message: 'aaaaa' }));
            }),
          );
        },
      } as IKlesDynamicFormDataDialog,
    });
    // dialogRef.componentInstance.onLoadedForm.subscribe(s => {
    //   dialogRef.componentInstance.getForm().valueChanges.subscribe(s => {
    //     console.log('Change Form=', s);
    //     dialogRef.componentInstance.getForm().controls['#select'].patchValue(true, { onlySelf: true, emitEvent: false });
    //   })
    // });

    dialogRef.afterClosed().subscribe((value) => console.log(value));

    return dialogRef;
  }
}
