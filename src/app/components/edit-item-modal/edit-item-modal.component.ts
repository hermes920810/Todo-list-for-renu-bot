import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService, TodoModelItem } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent {
  updatedTodo: TodoModelItem;

  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoModelItem,
    private apiService: ApiService,
  ) {
    this.updatedTodo = { ...data };
  }

  updateTodo(): void {
    this.apiService.updateTodoBySubscribe(this.updatedTodo).subscribe({
      next: (response) => {
        console.log('Todo updated:', response);
        this.dialogRef.close(response); // Close dialog and return updated todo
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
