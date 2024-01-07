import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedUiCrtLayoutDisplayService } from './services/shared-ui-crt-layout-display.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'my-projects-shared-ui-crt-layout-display',
  standalone: true,
  templateUrl: './shared-ui-crt-layout-display.component.html',
  styleUrls: ['./shared-ui-crt-layout-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SharedUiCrtLayoutDisplayService],
  imports: [AsyncPipe, NgIf],
})
export class SharedUiCrtLayoutDisplayComponent {
  public animationsEnabled$ = inject(SharedUiCrtLayoutDisplayService)
    .animationsEnabled$;
}
