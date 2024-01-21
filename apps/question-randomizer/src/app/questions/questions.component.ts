import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, map } from 'rxjs';
import { columnDefs } from './table-definitions/columns-definitions';
import { DialogService } from '../core/_services/dialog/dialog.service';
import { QuestionsFacade } from './_store/questions.facade';
import { EditQuestionComponent } from './_components/edit-question/edit-question.component';
import { Question } from './_models/frontend/question.model';
import { QuestionCsvListItem } from './_models/frontend/question-csv-list-item.model';
import { SettingsService } from '../settings/_services/settings.service';

@Component({
  selector: 'my-projects-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
  unitTestPracticeString = '';
  columnDefs = columnDefs;
  questionListLoaded$ = this.questionsFacade.questionListLoaded$;
  constructor(
    // private _dialog: MatDialog,
    private _dialog: DialogService,
    public questionsFacade: QuestionsFacade,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.questionsFacade.loadQuestionList();
    this.questionsFacade
      .getUnitTestPracticeString()
      .pipe(delay(500))
      .subscribe(
        (unitTestPracticeString) =>
          (this.unitTestPracticeString = unitTestPracticeString)
      );
  }

  onAdd(): void {
    this._dialog.open(EditQuestionComponent, {
      width: '650px',
      // height: '420px',
      data: {},
    });
  }

  onRowClick(question: Question): void {
    this._dialog.open(EditQuestionComponent, {
      width: '650px',
      // height: '420px',
      data: { question },
    });
  }

  onDelete(id: string) {
    this.questionsFacade.deleteQuestion(id);
  }

  onImport() {
    document.getElementById('txtFileUpload')!.click();
  }

  onExport() {
    this.questionsFacade.exportQuestionList();
  }

  onFileSelected($event: any): void {
    // TO DO
    // move to service
    const files = $event.srcElement.files;

    if (files[0].name.endsWith('.csv')) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result as string;
        const csvRecordsArray = csvData.split(/\r\n|\n/);
        const entities = this.getDataRecordsArrayFromCsvFile(csvRecordsArray);
        this.questionsFacade.importQuestionList(entities);
      };

      reader.onerror = function () {
        alert('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
    }
  }

  private getDataRecordsArrayFromCsvFile(csvRecordsArray: any) {
    // TO DO
    // move to service
    const csvArr = [];
    for (let i = 2; i < csvRecordsArray.length; i++) {
      const curruntRecord = csvRecordsArray[i].split(';') as any[];
      csvArr.push({
        question: curruntRecord[0].trim(),
        answer: curruntRecord[1].trim(),
        answerPl: curruntRecord[2].trim(),
        categoryName: curruntRecord[3].trim(),
        qualificationName: curruntRecord[4]?.trim(),
        isActive: curruntRecord[5] === 'true' ? true : false,
      } as QuestionCsvListItem);
    }
    return csvArr;
  }
}
