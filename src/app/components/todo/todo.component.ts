import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../shared/types/interfaces';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() currentTodo?: Todo;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.editTodoForm = new FormControl(
      this.currentTodo?.title,
      Validators.required
    );
  }

  createTodoForm: FormControl = new FormControl('', Validators.required);
  editTodoForm!: FormControl;

  isOpened: boolean = false;

  createTodo() {
    this.todoService
      .addTodo(this.createTodoForm.getRawValue());
  }

  deleteTodo() {
    this.todoService
      .deleteTodo(this.currentTodo!.id);
  }

  editTodo() {
    this.todoService
      .editTodo({
        id: this.currentTodo!.id,
        title: this.editTodoForm.getRawValue(),
        isCompleted: this.currentTodo!.isCompleted,
      });
  }
}
