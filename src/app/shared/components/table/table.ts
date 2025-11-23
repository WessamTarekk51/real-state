import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DecimalPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, DecimalPipe, CommonModule, NgIf],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() products: any[] = [];
  @Input() cols: any[] = [];
  @Input() totalPages: number;
  @Input() pageSize: number;


  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() pageNumber = new EventEmitter<any>();

  first = 0;
  currentPage = 1;

  constructor() { }

  ngOnInit() {
  }
  deleteItem(item: any) {
    this.delete.emit(item)
  }
  viewItem(item: any) {
    this.view.emit(item)
  }
  editItem(item: any) {
    this.edit.emit(item)
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    this.currentPage = Math.floor(this.first / this.pageSize) + 1;
    console.log("onPageChange"+this.currentPage)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.first = (this.currentPage - 1) * this.pageSize;
      this.pageNumber.emit(this.currentPage)
      console.log("prevPage"+this.currentPage)

    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.first = (this.currentPage - 1) * this.pageSize;
      this.pageNumber.emit(this.currentPage)
      console.log("nextPage"+this.currentPage)

    }
  }
}
