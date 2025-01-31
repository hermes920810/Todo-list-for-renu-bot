import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

export interface TodoModelItem {
  id: number;
  userId: number;
  name: string;
  title: string;
  completed: boolean;
  dateDue?: Date;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://jsonplaceholder.typicode.com/todos';
  private todos: TodoModelItem[] = [];

  constructor() {}

  // Fetch all todos
  getTodos(): Observable<TodoModelItem[]> {
    return from(
      axios.get<TodoModelItem[]>(this.API_URL).then((response) => {
        return response.data.map((todo) => ({
          ...todo,
          name: 'User ' + todo.userId, // JSONPlaceholder doesn't have a "name" field, so we mock it
          createdAt: new Date(),
          dateDue: new Date(new Date().setDate(new Date().getDate() + 7)), // Due in 7 days
        }));
      })
    );
  }

  updateTodoBySubscribe(updatedData: TodoModelItem): Observable<TodoModelItem> {
    return from(
      axios
        .put(`${this.API_URL}/${updatedData.id}`, updatedData).then(response => response.data)
    )
  }

  updateTodo(id: number, updatedData: TodoModelItem): void {
    axios
      .put(`${this.API_URL}/${id}`, updatedData)
      .then((response) => {
        console.log('Todo updated successfully:', response.data);
        // Update the local state
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) this.todos[index] = response.data;
      })
      .catch((error) => console.error('Error updating todo:', error));
  }
}
