import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from '../../public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatCheckboxModule,
    MatButtonModule, MatDividerModule, MatIconModule,
  ],
  exports: [TodoComponent, TodoListComponent],
})
export class TodoModule { }
