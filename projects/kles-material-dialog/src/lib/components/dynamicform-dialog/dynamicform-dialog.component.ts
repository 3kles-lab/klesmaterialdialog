import {
  Component,
  Inject,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  EventEmitter,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  flattenKlesFields,
  IKlesValidator,
  KlesDynamicFormComponent,
  KlesFormElement,
  KlesMaterialDynamicformsModule,
} from '@3kles/kles-material-dynamicforms';
import {
  IKlesDynamicFormDataDialog,
  KlesDynamicFormDirection,
} from './dynamicform-dialog.model';
import {
  AsyncValidatorFn,
  FormGroup,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { KlesDialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

@Component({
  templateUrl: './dynamicform-dialog.component.html',
  styleUrls: [
    '../../../../styles/title.style.scss',
    '../../../../styles/fullsize.style.scss',
    '../../../../styles/message-dialog.style.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    KlesMaterialDynamicformsModule,
    KlesDialogLayoutComponent,
  ],
})
export class KlesDynamicFormDialogComponent<
  TItem = any,
  TResponse = any,
  TError = any,
>
  extends KlesDialogAbstractComponent
  implements AfterViewInit
{
  @ViewChild('errorElem') errorElemRef!: ElementRef<HTMLElement>;

  title: string | undefined;
  fields: KlesFormElement[];
  validators: IKlesValidator<ValidatorFn>[] = [];
  asyncValidators: IKlesValidator<AsyncValidatorFn>[] = [];
  direction: KlesDynamicFormDirection = 'column';
  item: TItem;
  buttonCancel = 'Cancel';
  buttonOK = 'OK';
  onLoadedForm = new EventEmitter<boolean>();
  icon: string | undefined;
  pending = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<TError | null>(null);
  protected readonly pendingState = toSignal(this.pending, {
    initialValue: false,
  });
  protected readonly errorState = toSignal(this.error$, { initialValue: null });

  beforeClose: (item: TItem, form: FormGroup) => Observable<TResponse> = () =>
    of({} as TResponse);

  @ViewChild(KlesDynamicFormComponent, { static: true })
  dynamicForm!: KlesDynamicFormComponent;

  constructor(
    public dialogRef: MatDialogRef<
      KlesDynamicFormDialogComponent<TItem, TResponse, TError>
    >,
    @Inject(MAT_DIALOG_DATA)
    public data: IKlesDynamicFormDataDialog<TItem, TResponse>,
    private ref: ChangeDetectorRef,
  ) {
    super(dialogRef);
    this.item = data.item ? data.item : ({} as TItem);
    if (data.validators) this.validators = data.validators;
    if (data.asyncValidators) this.asyncValidators = data.asyncValidators;
    if (data.direction) {
      this.direction = data.direction;
    }
    const itemValues = this.item as Record<string, unknown>;
    flattenKlesFields(data.fields).forEach(
      (field) => (field.value = itemValues[field.name]),
    );
    this.fields = data.fields;
    this.icon = data.icon;
    if (data.buttonCancel) this.buttonCancel = data.buttonCancel;
    if (data.buttonOK) this.buttonOK = data.buttonOK;
    if (data.title) this.title = data.title;
    if (data.option) {
      if (data.option.fullsize) {
        this.setFullsize();
      }
      this.fullsizeButton.set(data.option.fullsizeButton || false);
    }

    if (data.beforeClose) {
      this.beforeClose = data.beforeClose;
    }
  }

  ngAfterViewInit(): void {
    if (this.item && Object.keys(this.item as object).length > 0) {
      this.dynamicForm.form.markAllAsTouched();
    }

    this.ref.detectChanges();
    this.onLoadedForm.emit(true);
  }

  getForm(): UntypedFormGroup {
    return this.dynamicForm.form;
  }

  getErrorMessage(error: TError): unknown {
    if (error !== null && typeof error === 'object' && 'message' in error) {
      return (error as { message?: unknown }).message;
    }

    return undefined;
  }

  onClose() {
    this.dialogRef.close('close');
  }
  onOK() {
    this.pending.next(true);
    this.beforeClose(this.item, this.dynamicForm.form).subscribe({
      next: (response) => {
        this.pending.next(false);
        this.dialogRef.close({
          item: this.item,
          form: this.dynamicForm.form.getRawValue(),
          ...(response && { response }),
        });
      },
      error: (e: unknown) => {
        console.error(e);
        this.error$.next(e as TError);
        this.pending.next(false);
        this.ref.markForCheck();
        setTimeout(() => {
          this.errorElemRef?.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      },
    });
  }
}
