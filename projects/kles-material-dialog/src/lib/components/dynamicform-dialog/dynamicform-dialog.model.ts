import { IKlesFieldConfig, IKlesValidator } from "@3kles/kles-material-dynamicforms";
import { AsyncValidatorFn, FormGroup, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export interface IKlesDynamicFormDataDialog {
    fields: IKlesFieldConfig[];
    validators?: IKlesValidator<ValidatorFn>[];
    asyncValidators?: IKlesValidator<AsyncValidatorFn>[];
    item?: any;
    direction?: 'column' | 'row';
    buttonCancel?: string;
    buttonOK?: string;
    title?: string;
    beforeClose?: (item: any, form: FormGroup) => Observable<any>;
}