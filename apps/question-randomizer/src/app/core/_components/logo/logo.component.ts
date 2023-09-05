import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoBreakpoint } from '../../_services/logo-breakpoints.service';

@Component({
  selector: 'my-projects-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @Input() breakpoint: LogoBreakpoint | null = null;
  constructor(private cdr: ChangeDetectorRef) {}

  logoBreakpointEnum = LogoBreakpoint;
}
