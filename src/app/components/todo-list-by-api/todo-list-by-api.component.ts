import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService, TodoModelItem } from 'src/app/services/api.service';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-todo-list-by-api',
  templateUrl: './todo-list-by-api.component.html',
  styleUrls: ['./todo-list-by-api.component.scss']
})
export class TodoListByApiComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'title', 'completed', 'dateDue', 'dateCreated', 'actions'];
  dataSource = new MatTableDataSource<TodoModelItem>([]);
  isLoading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTodos(): void {
    this.apiService.getTodos().subscribe({
      next: (todos) => {
        this.dataSource.data = todos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.isLoading = false;
      }
    })
  }
  
  openEditDialog(item: TodoModelItem) {
    if (this.isLoading) return;
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '400px',
      data: item, // Pass todo item to dialog
    });
  
    dialogRef.afterClosed().subscribe((updatedTodo) => {
      if (updatedTodo) {
        // Update the table data
        const index = this.dataSource.data.findIndex((item) => item.id === updatedTodo.id);
        if (index !== -1) {
          this.dataSource.data = this.dataSource.data.map(item => item.id === updatedTodo.id ? updatedTodo : item);
        }
      }
    });
  }

  editItem(event: Event, item: TodoModelItem): void {
    event.stopPropagation();
    this.openEditDialog(item);
    // this.router.navigate(['/edit', id]);
  }

  toggleCompleted(event: any, id: number): void {
    event.stopPropagation();
    const selectedItem = this.dataSource.data.find(item => item.id === id);
    if (selectedItem) {
      this.isLoading = true;
      const updateData = {
        ...selectedItem,
        completed: event.target.checked as boolean
      }
      this.apiService.updateTodoBySubscribe(updateData).subscribe({
        next: () => {
          this.isLoading = false;
        }
      })
    }
    // this.router.navigate(['/edit', id]);
  }

}
