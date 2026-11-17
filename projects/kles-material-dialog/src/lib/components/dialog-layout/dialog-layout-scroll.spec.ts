import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KlesDialogAbstractComponent } from '../kles-dialog.component';
import { KlesDialogLayoutComponent } from './dialog-layout.component';

@Component({
  standalone: true,
  imports: [KlesDialogLayoutComponent],
  template: `
    <kles-dialog-layout
      [contentScroll]="contentScroll"
      [fullsize]="fullsize()"
      [fullsizeButton]="true"
      (fullsizeToggle)="toggleFullsize()"
    >
      <span klesDialogTitle>Connection</span>
      <div klesDialogContent style="display: flex; flex: 1 1 auto; flex-direction: column; min-height: 0">
        <nav data-testid="tab-bar" style="flex: none">General | Advanced</nav>
        <div data-testid="tab-content" style="flex: 1 1 auto; min-height: 0; overflow-y: auto">
          <div style="min-height: 200vh">Long form</div>
          <div>End of form</div>
        </div>
      </div>
      <button klesDialogActionsEnd type="button">Save</button>
    </kles-dialog-layout>
  `,
})
class ScrollTestDialogComponent extends KlesDialogAbstractComponent {
  readonly contentScroll = inject<KlesDialogLayoutComponent['contentScroll']>(MAT_DIALOG_DATA);

  constructor() {
    super(inject(MatDialogRef));
  }
}

describe('KlesDialogLayoutComponent scrolling in MatDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, ScrollTestDialogComponent],
    });
  });

  afterEach(() => TestBed.inject(MatDialog).closeAll());

  for (const mode of ['dialog', 'delegated'] as const) {
    it(`scrolls in ${mode} mode before, during and after full screen`, () => {
      TestBed.inject(MatDialog).open(ScrollTestDialogComponent, {
        data: mode,
        autoFocus: false,
        width: '350px',
        height: '90vh',
      });
      TestBed.tick();

      const overlay = TestBed.inject(OverlayContainer).getContainerElement();
      const pane = overlay.querySelector<HTMLElement>('.cdk-overlay-pane')!;
      const surface = pane.querySelector<HTMLElement>('.mat-mdc-dialog-surface')!;
      const content = pane.querySelector<HTMLElement>('mat-dialog-content')!;
      const header = pane.querySelector<HTMLElement>('.kles-dialog-layout__header')!;
      const footer = pane.querySelector<HTMLElement>('.kles-dialog-layout__footer')!;
      const toggle = pane.querySelector<HTMLButtonElement>('.kles-dialog-layout__fullsize')!;
      const tabBar = pane.querySelector<HTMLElement>('[data-testid="tab-bar"]')!;
      const tabContent = pane.querySelector<HTMLElement>('[data-testid="tab-content"]')!;
      const delegated = mode === 'delegated';
      const scroller = delegated ? tabContent : content;
      const other = delegated ? content : tabContent;

      function expectScroll(phase: string): void {
        const headerTop = header.getBoundingClientRect().top;
        const footerTop = footer.getBoundingClientRect().top;
        const tabBarTop = tabBar.getBoundingClientRect().top;

        expect(getComputedStyle(content).overflowY).withContext(phase)
          .toBe(delegated ? 'hidden' : 'auto');
        expect(getComputedStyle(scroller).overflowY).withContext(phase).toBe('auto');
        expect(other.scrollHeight - other.clientHeight).withContext(phase).toBeLessThanOrEqual(1);
        expect(surface.scrollHeight - surface.clientHeight).withContext(phase).toBeLessThanOrEqual(1);

        scroller.scrollTop = scroller.scrollHeight;
        expect(scroller.scrollTop).withContext(phase).toBeGreaterThan(0);
        expect(Math.abs(scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop))
          .withContext(phase).toBeLessThanOrEqual(1);
        expect(header.getBoundingClientRect().top).withContext(phase).toBe(headerTop);
        expect(footer.getBoundingClientRect().top).withContext(phase).toBe(footerTop);
        expect(tabBar.getBoundingClientRect().top).withContext(phase)
          .toBeCloseTo(tabBarTop - (delegated ? 0 : scroller.scrollTop), 0);
        scroller.scrollTop = 0;
      }

      const windowedSize = pane.getBoundingClientRect();
      expect(windowedSize.width).toBeCloseTo(350, 0);
      expect(windowedSize.height).toBeCloseTo(window.innerHeight * 0.9, 0);
      expectScroll('windowed');

      toggle.click();
      TestBed.tick();
      expect(pane.classList.contains('dialog-fullsize')).toBeTrue();
      expect(pane.getBoundingClientRect().height).toBeCloseTo(window.innerHeight, 0);
      expectScroll('full screen');

      toggle.click();
      TestBed.tick();
      expect(pane.classList.contains('dialog-fullsize')).toBeFalse();
      expect(pane.getBoundingClientRect().width).toBeCloseTo(windowedSize.width, 0);
      expect(pane.getBoundingClientRect().height).toBeCloseTo(windowedSize.height, 0);
      expectScroll('back to windowed');
    });
  }
});
