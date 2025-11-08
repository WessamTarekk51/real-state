import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DecimalPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, DecimalPipe, CommonModule,NgIf],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() products: any[] = [];
  @Input() cols: any[] = [];

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  rows = 14;
  first = 0;
  currentPage = 1;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.products.length / this.rows);
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
    this.rows = event.rows;
    this.currentPage = Math.floor(this.first / this.rows) + 1;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.first = (this.currentPage - 1) * this.rows;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.first = (this.currentPage - 1) * this.rows;
    }
  }
}
