import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SharedUiCrtButtonsButtonComponent } from '@my-projects/shared/ui-crt';

@Component({
  selector: 'my-projects-question-randomizer-confirm-dialog',
  standalone: true,
  imports: [SharedUiCrtButtonsButtonComponent],
  templateUrl: './question-randomizer-confirm-dialog.component.html',
  styleUrls: ['./question-randomizer-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionRandomizerConfirmDialogComponent {
  @Input() confirmText = 'Confirm';
  @Input() closeText = 'Close';
  @Output() confirmDialog = new EventEmitter<void>();
  @Output() closeDialog = new EventEmitter<void>();
}
