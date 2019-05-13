import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoGuard } from './todo.guard';
import { TodoInterceptor } from './todo.interceptor';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [AddTodoComponent, ListTodoComponent, EditTodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  providers: [
    TodoService,
    TodoGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TodoInterceptor,
      multi: true,
    },
  ],
  exports: [AddTodoComponent, EditTodoComponent, ListTodoComponent],
})
export class TodoModule {}
