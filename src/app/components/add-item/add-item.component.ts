import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})

export class AddItemComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateDue: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      const newTodo = {
        id: crypto.randomUUID(),
        name: this.form.value.name,
        title: this.form.value.title,
        description: this.form.value.description,
        dateCreated: new Date(),
        dateDue: this.form.value.dateDue,
      };
      this.todoService.addTodo(newTodo);
      this.form.reset();
      this.router.navigate(['/']);
    }
  }
}
