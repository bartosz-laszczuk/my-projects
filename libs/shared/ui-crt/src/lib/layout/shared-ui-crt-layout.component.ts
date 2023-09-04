import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-projects-shared-ui-crt-layout',
  standalone: true,
  templateUrl: './shared-ui-crt-layout.component.html',
  styleUrls: ['./shared-ui-crt-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtLayoutComponent {}
