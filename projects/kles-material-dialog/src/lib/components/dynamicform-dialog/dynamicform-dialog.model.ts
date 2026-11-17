import { IKlesValidator, KlesFormElement } from '@3kles/kles-material-dynamicforms';
import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { IKlesDialogOptions } from '../kles-dialog.component';

export type KlesDynamicFormDirection =
  | 'column'
  | 'row'
  | 'grid'
  | 'inline-grid';

export interface IKlesDynamicFormDataDialog<TItem = any, TResponse = any> {
  fields: KlesFormElement[];
  validators?: IKlesValidator<ValidatorFn>[];
  asyncValidators?: IKlesValidator<AsyncValidatorFn>[];
  /** Own properties override the corresponding field defaults. */
  item?: TItem;
  direction?: KlesDynamicFormDirection;
  buttonCancel?: string;
  buttonOK?: string;
  title?: string;
  icon?: string;
  option?: IKlesDialogOptions;
  /** The first emission submits the form. Completing without an emission keeps the dialog open. */
  beforeClose?: (item: TItem, form: FormGroup) => Observable<TResponse>;
}
