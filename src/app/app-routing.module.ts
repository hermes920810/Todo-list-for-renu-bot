import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { TodoListByApiComponent } from './components/todo-list-by-api/todo-list-by-api.component';

const routes: Routes = [
  { path: '', component: ListViewComponent },
  { path: 'add', component: AddItemComponent },
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'list', component: TodoListByApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
