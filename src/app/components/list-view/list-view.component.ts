import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { TodoService, TodoItem } from '../../services/todo.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  displayedColumns: string[] = ['index', 'name', 'title', 'description', 'dateDue', 'dateCreated', 'action'];
  todos: TodoItem[] = [];

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog
  ) {
    this.todos = this.todoService.getTodos();
  }

  openItemModal(item: TodoItem): void {
    this.dialog.open(ItemModalComponent, {
      data: item,
    });
  }

  removeItem(event: Event, id: string): void {
    event.stopPropagation()
    this.todoService.removeItem(id);
    this.todos = this.todoService.getTodos();
  }
}
