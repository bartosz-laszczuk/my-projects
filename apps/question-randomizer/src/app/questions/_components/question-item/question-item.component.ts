import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiCrtButtonsButtonComponent } from '@my-projects/shared/ui-crt';
import { Question } from '../../_models/frontend/question.model';

@Component({
  selector: 'my-projects-question-item',
  standalone: true,
  imports: [CommonModule, SharedUiCrtButtonsButtonComponent],
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionItemComponent {
  @Input() item: Question | undefined;

  @Output() edit = new EventEmitter<Question>();
  @Output() delete = new EventEmitter<string>();

  onEdit(question: Question): void {
    this.edit.emit(question);
  }

  // onDelete(id: string): void {
  //   this.delete.emit(id);
  // }

  // $event.stopPropagation() for unit testing purposes
  onDelete($event: any, id: string): void {
    $event.stopPropagation();
    this.delete.emit(id);
  }
}
