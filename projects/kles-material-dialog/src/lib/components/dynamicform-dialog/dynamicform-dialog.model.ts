import { IKlesFieldConfig, IKlesValidator } from "@3kles/kles-material-dynamicforms";
import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface IKlesDynamicFormDataDialog {
    fields: IKlesFieldConfig[];
    validators?: IKlesValidator<ValidatorFn>[];
    asyncValidators?: IKlesValidator<AsyncValidatorFn>[];
    item?: any;
    direction?: 'column' | 'row';
    buttonCancel?: string;
    buttonOK?: string;
    title?: string;
}