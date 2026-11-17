import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { firstValueFrom } from 'rxjs';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { KlesDynamicFormDialogComponent } from '../dynamicform-dialog/dynamicform-dialog.component';

describe('KlesDialogLayoutComponent header close button', () => {
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MatDialogModule, NoopAnimationsModule] });
    dialog = TestBed.inject(MatDialog);
  });

  afterEach(() => dialog.closeAll());

  function getTitle(): HTMLElement {
    TestBed.tick();
    return TestBed.inject(OverlayContainer).getContainerElement()
      .querySelector<HTMLElement>('.kles-dialog-layout__title')!;
  }

  it('hides the close button by default', () => {
    dialog.open(AlertDialogComponent);

    expect(getTitle().querySelector('.kles-dialog-layout__close')).toBeNull();
  });

  it('places the close button after the full-screen button and closes the dialog', async () => {
    const ref = dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {
        title: 'Connection',
        option: { closeButton: true, closeButtonAriaLabel: 'Fermer', fullsizeButton: true },
      },
    });
    const title = getTitle();
    const close = title.querySelector<HTMLButtonElement>('.kles-dialog-layout__close')!;
    const fullsize = title.querySelector<HTMLButtonElement>('.kles-dialog-layout__fullsize')!;

    expect(close.previousElementSibling).toBe(fullsize);
    expect(close.getBoundingClientRect().left).toBeCloseTo(fullsize.getBoundingClientRect().right, 0);
    expect(close.getBoundingClientRect().right).toBeCloseTo(title.getBoundingClientRect().right, 0);
    expect(close.getAttribute('aria-label')).toBe('Fermer');

    const result = firstValueFrom(ref.afterClosed());
    close.click();
    expect(await result).toBeUndefined();
  });

  it('returns the dynamic form cancellation result when clicked', async () => {
    const beforeClose = jasmine.createSpy('beforeClose');
    const ref = dialog.open(KlesDynamicFormDialogComponent, {
      data: { fields: [], option: { closeButton: true }, beforeClose },
    });
    const title = getTitle();
    const close = title.querySelector<HTMLButtonElement>('.kles-dialog-layout__close')!;

    expect(close.getBoundingClientRect().right).toBeCloseTo(title.getBoundingClientRect().right, 0);
    const result = firstValueFrom(ref.afterClosed());
    close.click();
    expect(await result).toBe('close');
    expect(beforeClose).not.toHaveBeenCalled();
  });
});
