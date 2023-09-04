import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'my-projects-shared-ui-crt-layout-section',
  templateUrl: './shared-ui-crt-layout-section.component.html',
  standalone: true,
  styleUrls: ['./shared-ui-crt-layout-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtLayoutSectionComponent {
  @Input() header = '';
  @Input() height = 'auto';
}
