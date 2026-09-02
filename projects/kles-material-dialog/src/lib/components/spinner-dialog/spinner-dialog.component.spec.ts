import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpinnerDialogComponent } from './spinner-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('SpinnerDialogComponent', () => {
  let component: SpinnerDialogComponent;
  let fixture: ComponentFixture<SpinnerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('kles-dialog-layout')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.kles-dialog-layout__header'),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.kles-dialog-layout__footer'),
    ).toBeNull();
  });
});
