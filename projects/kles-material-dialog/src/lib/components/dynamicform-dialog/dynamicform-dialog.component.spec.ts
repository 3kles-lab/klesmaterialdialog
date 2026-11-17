import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  EnumType,
  IKlesFieldConfig,
  KlesFormCheckboxComponent,
  KlesFormElement,
  KlesFormInputComponent,
} from '@3kles/kles-material-dynamicforms';
import { of, Subject } from 'rxjs';
import { KlesDynamicFormDialogComponent } from './dynamicform-dialog.component';

describe('KlesDynamicFormDialogComponent submission', () => {
  let fixture: ComponentFixture<KlesDynamicFormDialogComponent>;
  let beforeClose: jasmine.Spy;
  let close: jasmine.Spy;
  let submit: HTMLButtonElement;

  beforeEach(() => {
    beforeClose = jasmine.createSpy('beforeClose');
    close = jasmine.createSpy('close');
    TestBed.configureTestingModule({
      imports: [KlesDynamicFormDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { fields: [], beforeClose } },
        { provide: MatDialogRef, useValue: { close } },
      ],
    });

    fixture = TestBed.createComponent(KlesDynamicFormDialogComponent);
    fixture.detectChanges();
    submit = fixture.nativeElement.querySelector('button[mat-flat-button]');
  });

  it('allows a retry after beforeClose throws synchronously', fakeAsync(() => {
    spyOn(console, 'error');
    beforeClose.and.throwError('Save failed');

    expect(() => fixture.componentInstance.onOK()).not.toThrow();
    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('mat-error')?.textContent)
      .toContain('Save failed');
    expect(submit.disabled).toBeFalse();
    expect(close).not.toHaveBeenCalled();

    const response = { saved: true };
    beforeClose.and.returnValue(of(response));
    submit.click();

    expect(close).toHaveBeenCalledOnceWith({ item: {}, form: {}, response });
  }));

  it('allows a retry when beforeClose completes without emitting', () => {
    const response = new Subject<void>();
    beforeClose.and.returnValue(response);
    submit.click();
    fixture.detectChanges();

    expect(submit.disabled).toBeTrue();

    response.complete();
    fixture.detectChanges();

    expect(submit.disabled).toBeFalse();
    expect(close).not.toHaveBeenCalled();

    beforeClose.and.returnValue(of(undefined));
    submit.click();

    expect(close).toHaveBeenCalledOnceWith({ item: {}, form: {} });
  });
});

describe('KlesDynamicFormDialogComponent field initialization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MatDialogModule, NoopAnimationsModule] });
  });

  afterEach(() => TestBed.inject(MatDialog).closeAll());

  it('preserves root and nested defaults when reusing fields across dialogs', () => {
    const name = { name: 'name', component: KlesFormInputComponent, value: 'Default name' };
    const region = { name: 'region', component: KlesFormInputComponent, value: 'Europe' };
    const enabled = { name: 'enabled', component: KlesFormCheckboxComponent, value: true };
    const fields: KlesFormElement[] = [
      name,
      {
        type: 'section',
        title: 'Settings',
        fields: [{ type: 'layoutGroup', fields: [region, enabled] }],
      },
    ];

    const dialog = TestBed.inject(MatDialog);
    const edit = dialog.open(KlesDynamicFormDialogComponent, {
      data: { fields, item: { name: '', enabled: false } },
    });
    TestBed.tick();

    expect(edit.componentInstance.getForm().getRawValue()).toEqual({
      name: '', region: 'Europe', enabled: false,
    });
    expect(name.value).toBe('Default name');
    expect(region.value).toBe('Europe');
    expect(enabled.value).toBeTrue();

    edit.close();
    const create = dialog.open(KlesDynamicFormDialogComponent, { data: { fields } });
    TestBed.tick();

    expect(create.componentInstance.getForm().getRawValue()).toEqual({
      name: 'Default name', region: 'Europe', enabled: true,
    });
  });

  it('keeps group initialization state in the dialog copy', () => {
    const note: IKlesFieldConfig = { name: 'note', component: KlesFormInputComponent };
    const group: IKlesFieldConfig = {
      name: 'settings',
      type: EnumType.group,
      collections: [note],
      asyncValue: of({ note: 'Loaded' }),
    };

    const ref = TestBed.inject(MatDialog).open(KlesDynamicFormDialogComponent, {
      data: { fields: [group] },
    });
    TestBed.tick();

    expect(ref.componentInstance.getForm().getRawValue()).toEqual({
      settings: { note: 'Loaded' },
    });
    expect(group.value).toBeUndefined();
    expect(group.pending).toBeUndefined();
    expect(note.pending).toBeUndefined();
  });
});
