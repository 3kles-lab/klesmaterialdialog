import {
  IKlesFieldConfig,
  IKlesValidator,
} from '@3kles/kles-material-dynamicforms';
import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { IKlesDialogOptions } from '../kles-dialog.component';

export type KlesDynamicFormDirection =
  | 'column'
  | 'row'
  | 'grid'
  | 'inline-grid';

export interface IKlesDynamicFormDataDialog<TItem = any, TResponse = any> {
  fields: IKlesFieldConfig[];
  validators?: IKlesValidator<ValidatorFn>[];
  asyncValidators?: IKlesValidator<AsyncValidatorFn>[];
  item?: TItem;
  direction?: KlesDynamicFormDirection;
  buttonCancel?: string;
  buttonOK?: string;
  title?: string;
  icon?: string;
  option?: IKlesDialogOptions;
  beforeClose?: (item: TItem, form: FormGroup) => Observable<TResponse>;
}
