import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { TodoGuard } from './todo.guard';

const routes: Routes = [
  { path: '', component: ListTodoComponent, canActivate: [TodoGuard] },
  { path: 'add', component: AddTodoComponent, canActivate: [TodoGuard] },
  { path: 'edit/:id', component: EditTodoComponent, canActivate: [TodoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
