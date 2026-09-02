import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  KlesDialogLayoutComponent,
  KlesDialogTitleContentAlign,
} from './dialog-layout.component';

@Component({
  template: `
    <kles-dialog-layout
      icon="settings"
      [fullsizeButton]="true"
      [titleContentAlign]="titleContentAlign"
    >
      <span klesDialogTitle data-testid="title">Connection</span>
      <span klesDialogTitleContent data-testid="title-content">Help</span>
      <div klesDialogContent data-testid="content">Scrollable form</div>
      <div klesDialogStatus data-testid="status">Connection succeeded</div>
      <button klesDialogActionsStart data-testid="actions-start">Active</button>
      <button klesDialogActionsEnd data-testid="actions-end">Save</button>
    </kles-dialog-layout>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KlesDialogLayoutComponent],
})
class TestHostComponent {
  titleContentAlign: KlesDialogTitleContentAlign = 'end';
}

describe('KlesDialogLayoutComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('projects every dialog zone', () => {
    expect(element.querySelector('[data-testid="title"]')?.textContent).toContain(
      'Connection',
    );
    expect(
      element.querySelector('[data-testid="title-content"]')?.textContent,
    ).toContain('Help');
    expect(element.querySelector('[data-testid="content"]')?.textContent).toContain(
      'Scrollable form',
    );
    expect(element.querySelector('[data-testid="status"]')?.textContent).toContain(
      'Connection succeeded',
    );
    expect(
      element.querySelector('[data-testid="actions-start"]')?.textContent,
    ).toContain('Active');
    expect(
      element.querySelector('[data-testid="actions-end"]')?.textContent,
    ).toContain('Save');
  });

  it('aligns additional title content just before the full-screen button', () => {
    const titleContent = element.querySelector(
      '.kles-dialog-layout__title-content',
    ) as HTMLElement;
    const fullsizeButton = element.querySelector(
      '.kles-dialog-layout__fullsize',
    ) as HTMLElement;

    expect(
      parseFloat(getComputedStyle(titleContent).marginInlineStart),
    ).toBeGreaterThan(0);
    expect(titleContent.nextElementSibling).toBe(fullsizeButton);
  });

  it('supports start, center and end title content alignment', () => {
    for (const alignment of ['start', 'center', 'end'] as const) {
      const alignmentFixture = TestBed.createComponent(TestHostComponent);
      alignmentFixture.componentInstance.titleContentAlign = alignment;
      alignmentFixture.detectChanges();
      const titleContent = alignmentFixture.nativeElement.querySelector(
        '.kles-dialog-layout__title-content',
      ) as HTMLElement;
      const title = alignmentFixture.nativeElement.querySelector(
        '.kles-dialog-layout__title',
      ) as HTMLElement;
      const fullsizeButton = alignmentFixture.nativeElement.querySelector(
        '.kles-dialog-layout__fullsize',
      ) as HTMLElement;

      expect(
        titleContent.classList.contains(
          `kles-dialog-layout__title-content--${alignment}`,
        ),
      ).toBeTrue();
      expect(
        Math.abs(
          title.getBoundingClientRect().right -
            fullsizeButton.getBoundingClientRect().right,
        ),
      ).toBeLessThan(1);

      alignmentFixture.destroy();
    }
  });

  it('uses a scrollable mat-dialog-content area', () => {
    const content = element.querySelector(
      '.kles-dialog-layout__content',
    ) as HTMLElement;

    expect(content.classList.contains('mat-mdc-dialog-content')).toBeTrue();
    expect(getComputedStyle(content).overflowY).toBe('auto');
  });

  it('keeps status and actions together in a fixed footer', () => {
    const footer = element.querySelector(
      '.kles-dialog-layout__footer',
    ) as HTMLElement;
    const status = element.querySelector('.kles-dialog-layout__status');
    const actions = element.querySelector('.kles-dialog-layout__actions');

    expect(footer.contains(status)).toBeTrue();
    expect(footer.contains(actions)).toBeTrue();
    expect(getComputedStyle(footer).flexShrink).toBe('0');
    expect(status?.nextElementSibling).toBe(actions);
  });

  it('fills the viewport and removes the Material width cap in full screen', () => {
    const host = fixture.nativeElement as HTMLElement;
    const layout = element.querySelector('kles-dialog-layout') as HTMLElement;
    host.classList.add('dialog-fullsize');

    expect(getComputedStyle(host).maxWidth).toBe('none');
    expect(getComputedStyle(layout).height).toBe(`${window.innerHeight}px`);
  });
});
