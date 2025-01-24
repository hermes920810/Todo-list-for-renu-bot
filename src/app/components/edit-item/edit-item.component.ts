import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  todo: TodoItem = {
    id: '',
    title: '',
    name: '',
    description: '',
    dateCreated: new Date(),
    dateDue: new Date(),
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]');
      this.todo = todos.find((t: any) => t.id === id);
    }
  }

  onSubmit(): void {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((t: any) => t.id === this.todo.id);
    if (index !== -1) {
      todos[index] = this.todo;
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
