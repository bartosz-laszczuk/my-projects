import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonType = 'button' | 'submit';

@Component({
  selector: 'my-projects-shared-ui-crt-buttons-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui-crt-buttons-button.component.html',
  styleUrls: ['./shared-ui-crt-buttons-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtButtonsButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() stretch = false;
}
