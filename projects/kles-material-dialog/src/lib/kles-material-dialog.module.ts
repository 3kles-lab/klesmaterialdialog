import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SpinnerDialogComponent } from './components/spinner-dialog/spinner-dialog.component';
import { KlesDynamicFormDialogComponent } from './components/dynamicform-dialog/dynamicform-dialog.component';
import { KlesMaterialDynamicformsModule } from '@3kles/kles-material-dynamicforms';
import { DialogService } from './services/dialog.service';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  SpinnerDialogComponent,
  KlesDynamicFormDialogComponent
];

const SERVICES = [DialogService]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    KlesMaterialDynamicformsModule,
    TranslateModule
  ],
  //entryComponents: [COMPONENTS],
  providers: [SERVICES],
  exports: [COMPONENTS]
})

export class KlesMaterialDialogModule { }
