import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { EditTodoComponent } from './todo/edit-todo/edit-todo.component';
import { ListTodoComponent } from './todo/list-todo/list-todo.component';

const routes: Routes = [
  { path: 'todo', component: ListTodoComponent },
  { path: 'todo/edit', component: EditTodoComponent },
  { path: 'todo/add', component: AddTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
