import { Component, AfterViewInit , ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { TodoItem } from '../../services/todo.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})

export class ListViewComponent implements AfterViewInit, OnInit  {
  displayedColumns: string[] = ['index', 'name', 'title', 'description', 'dateDue', 'dateCreated', 'actions'];
  dataSource = new MatTableDataSource<TodoItem>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTodos(): void {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]') as TodoItem[];
    this.dataSource.data = todos.map(item => ({...item, dueDate: new Date(item.dateDue)}));
  }

  openItemModal(item: TodoItem): void {
    this.dialog.open(ItemModalComponent, {
      data: item,
    });
  }

  editItem(event: Event, id: string): void {
    event.stopPropagation()
    this.router.navigate(['/edit', id]);
  }

  removeItem(event: Event, item: TodoItem): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, { data: item });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((t) => t.id !== item.id);
        localStorage.setItem('todos', JSON.stringify(this.dataSource.data));
      }
    });
  }
}
