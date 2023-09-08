import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../../_models/frontend/question.model';
import { QuestionsTableSettingsService } from '../../_services/questions-table-settings.service';
import { IColumn, PageEvent } from '@my-projects/shared/ui-crt';

@Component({
  selector: 'my-projects-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionsTableSettingsService],
})
export class QuestionsTableComponent {
  @Output() rowClick = new EventEmitter<Question>();
  constructor(public tableService: QuestionsTableSettingsService) {}

  searchPhrase = '';
  doSearchWithPhrase = new Subject<string>();

  onRowClick(question: Question) {
    this.rowClick.emit(question);
  }

  onSort(column: IColumn) {
    // this.tableService.sort(column);
  }

  onPageChange(page: PageEvent) {
    // this.tableService.pageChange(page);
  }
}
