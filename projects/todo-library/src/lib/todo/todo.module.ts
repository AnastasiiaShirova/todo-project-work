import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TodoApiService } from './services/todo-api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoApiInterceptor } from './interseptors/todo-api.interceptor';

@NgModule({
  declarations: [TodoComponent, TodoListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
  ],
  exports: [TodoComponent, TodoListComponent],
  providers: [
    TodoService,
    TodoApiService,
    { provide: HTTP_INTERCEPTORS, useClass: TodoApiInterceptor, multi: true },
  ],
})
export class TodoModule {}
