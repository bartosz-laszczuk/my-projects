import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SharedUiCrtButtonsButtonComponent } from '@my-projects-nx/shared/ui/crt/buttons/button';

@Component({
  selector: 'my-projects-nx-question-randomizer-confirm-dialog',
  standalone: true,
  imports: [SharedUiCrtButtonsButtonComponent],
  templateUrl: './question-randomizer-confirm-dialog.component.html',
  styleUrls: ['./question-randomizer-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionRandomizerConfirmDialogComponent {
  @Input() confirmText = 'Confirm';
  @Input() closeText = 'Close';
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
