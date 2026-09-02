import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export type KlesDialogTitleContentAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'kles-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrl: './dialog-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
})
export class KlesDialogLayoutComponent {
  @Input() icon?: string;
  @Input() fullsize = false;
  @Input() fullsizeButton = false;
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() titleContentAlign: KlesDialogTitleContentAlign = 'end';

  @Output() readonly fullsizeToggle = new EventEmitter<void>();
}
