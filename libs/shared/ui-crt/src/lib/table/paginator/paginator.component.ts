import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from './_models/page-event.model';

@Component({
  selector: 'my-projects-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() showFirstLastButtons = true;
  @Input() length = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 0;
  @Input() pageSizeOptions = 0;
  @Input() disabled = 0;
  @Output() page = new EventEmitter<PageEvent>();
  numberOfPages = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.length && this.pageSize) {
      this.numberOfPages = Math.ceil(this.length / this.pageSize);
    }
    if (this.length === 0) {
      this.numberOfPages = 1;
    }
  }

  onPage(newPageIndex: number) {
    this.page.emit({
      length: this.length,
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
    } as PageEvent);
  }
}
