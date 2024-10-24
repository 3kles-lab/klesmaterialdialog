import { Component, Inject, ViewChild, AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IKlesFieldConfig, IKlesValidator, KlesDynamicFormComponent } from '@3kles/kles-material-dynamicforms';
import { IKlesDynamicFormDataDialog } from './dynamicform-dialog.model';
import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    templateUrl: './dynamicform-dialog.component.html',
    styles: [],
})
export class KlesDynamicFormDialogComponent implements AfterViewInit {

    fields: IKlesFieldConfig[];
    validators: IKlesValidator<ValidatorFn>[] = [];
    asyncValidators: IKlesValidator<AsyncValidatorFn>[] = [];
    direction: string = 'column';
    item: any;
    buttonCancel = 'Cancel';
    buttonOK = 'OK';
    onLoadedForm = new EventEmitter();

    @ViewChild(KlesDynamicFormComponent, { static: true }) dynamicForm: KlesDynamicFormComponent;

    constructor(public dialogRef: MatDialogRef<KlesDynamicFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IKlesDynamicFormDataDialog,
        private ref: ChangeDetectorRef) {
        this.item = (data.item) ? data.item : {};
        if (data.validators) this.validators = data.validators;
        if (data.asyncValidators) this.asyncValidators = data.asyncValidators;
        if (data.direction) {
            this.direction = data.direction;
        }
        data.fields.forEach(f => f.value = this.item[f.name]);
        this.fields = data.fields;
        if (data.buttonCancel) this.buttonCancel = data.buttonCancel;
        if (data.buttonOK) this.buttonOK = data.buttonOK;

    }

    ngAfterViewInit(): void {
        if (this.item && Object.keys(this.item).length > 0) {
            this.dynamicForm.form.markAllAsTouched();
        }

        this.ref.detectChanges();
        this.onLoadedForm.emit(true);
    }

    getForm(): FormGroup {
        return this.dynamicForm.form;
    }

    onClose() {
        this.dialogRef.close('close');
    }
    onOK() {
        this.item = {
            ...this.item,
            ...this.dynamicForm.form.value
        };
        console.log(this.item)
        this.dialogRef.close({ item: this.item });
    }
}

