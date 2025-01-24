import { Injectable } from '@angular/core';

export interface TodoItem {
  id: string;
  name: string;
  title: string;
  description: string;
  dateCreated: Date;
  dateDue: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: TodoItem[] = JSON.parse(localStorage.getItem('todos') || '[]');

  getTodos(): TodoItem[] {
    return this.todos;
  }

  addTodo(item: TodoItem): void {
    this.todos.push(item);
    this.saveToLocalStorage();
  }

  removeItem(id: string): void {
    const item = this.todos.find((todo) => todo.id === id);
    if (item) {
      const items = this.todos.filter(i => i.id !== id);
      this.todos = items;
      this.saveToLocalStorage();
    }
  }

  getTodoById(id: string): TodoItem | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
