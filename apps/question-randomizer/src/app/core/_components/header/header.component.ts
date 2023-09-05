import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LogoBreakpoint } from '../../_services/logo-breakpoints.service';
import { User } from '../../_models/backend/user/user.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'my-projects-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() breakpoint: LogoBreakpoint | null = null;
  @Input() user: User | null = null;
  @Input() isAuthorized = false;
  @Output() signOut = new EventEmitter<void>();

  constructor(private router: Router) {}

  onSignOut(): void {
    this.signOut.emit();
  }

  onProfileNavigate(): void {
    const path = this.user ? this.user.uid : 'new';
    this.router.navigate(['/profile', path]);
  }
}
