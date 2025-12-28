import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { DecimalPipe, CommonModule, NgIf, NgFor } from '@angular/common';
import { SharedServices } from '../../services/shared-services';

@Component({
  selector: 'app-table',
  imports: [TableModule, DecimalPipe, CommonModule],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  @Input() items: any;
  @Input() cols: any[] = [];
  @Input() totalPages: number;
  @Input() pageSize: number;

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() pageNumber = new EventEmitter<any>();
  @Output() print = new EventEmitter<any>();

  first = 0;
  currentPage = 1;

  constructor(private shared: SharedServices, private cd: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      console.log('items changed:', this.items);
    }
  }
  ngOnInit() {}
  deleteItem(item: any) {
    this.delete.emit(item);
  }
  viewItem(item: any) {
    this.view.emit(item);
  }
  editItem(item: any) {
    this.edit.emit(item);
  }

  printItem(item: any, rowId: string) {
    this.shared.printRow(rowId);
    this.print.emit(item);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.first = (this.currentPage - 1) * this.pageSize;
      this.pageNumber.emit(this.currentPage);
      console.log('prevPage' + this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.first = (this.currentPage - 1) * this.pageSize;
      this.pageNumber.emit(this.currentPage);
      console.log('nextPage' + this.currentPage);
    }
  }
}
