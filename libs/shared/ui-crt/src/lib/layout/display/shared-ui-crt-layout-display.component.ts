import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-projects-shared-ui-crt-layout-display',
  standalone: true,
  templateUrl: './shared-ui-crt-layout-display.component.html',
  styleUrls: ['./shared-ui-crt-layout-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtLayoutDisplayComponent {}
