import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subject, debounceTime, map } from 'rxjs';
import { Question } from '../../_models/frontend/question.model';
import { QuestionsTableSettingsService } from '../../_services/questions-table-settings.service';
import {
  FieldSearchParameter,
  IColumn,
  PageEvent,
} from '@my-projects/shared/ui-crt';
import { SettingsService } from '../../../settings/_services/settings.service';

@Component({
  selector: 'my-projects-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionsTableSettingsService],
})
export class QuestionsTableComponent {
  @Output() rowClick = new EventEmitter<Question>();
  constructor(
    public tableService: QuestionsTableSettingsService,
    public settingsService: SettingsService
  ) {
    this.tableService.init();
  }

  searchPhrase = '';
  doSearchWithPhrase = new Subject<string>();

  ngOnInit(): void {
    this.initSubscriptions();
  }

  onSort(column: IColumn) {
    this.tableService.sort(column);
  }

  onPageChange(page: PageEvent) {
    this.tableService.pageChange(page);
  }

  onRowClick(question: Question) {
    this.rowClick.emit(question);
  }

  private initSubscriptions() {
    this.tableService.init();
    this.doSearchWithPhrase
      .pipe(
        // TODO
        // takeUntil destroyed
        debounceTime(500),
        map((searchPhrase) => searchPhrase.trim().toLowerCase())
      )
      .subscribe((searchPhrase) => {
        const newFilters = new Map<keyof Question, FieldSearchParameter>([
          ['question' as keyof Question, searchPhrase],
          ['answer' as keyof Question, searchPhrase],
        ]);
        this.tableService.filterByFields(newFilters);
      });
    // this.tableService.displayResults$
    //   .pipe(
    //     // TODO
    //     // takeUntil destroyed
    //     tap((displayResults) => (this.displayResults = displayResults)),
    //     tap(() => this.cdr.markForCheck())
    //   )
    //   .subscribe();
  }
}
