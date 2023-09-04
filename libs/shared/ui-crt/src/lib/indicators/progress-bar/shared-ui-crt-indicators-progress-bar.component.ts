import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-projects-nx-shared-ui-crt-indicators-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui-crt-indicators-progress-bar.component.html',
  styleUrls: ['./shared-ui-crt-indicators-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtIndicatorsProgressBarComponent {}
