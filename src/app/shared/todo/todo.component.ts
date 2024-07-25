import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { TodoInterface } from './interfaces/todo-interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() readingTodo?: TodoInterface;
  @Output() newTodo = new EventEmitter();
  @Output() deleteTodoEmitter = new EventEmitter();
  @Output() editTodoEmitter = new EventEmitter();

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.editTodoForm = new FormControl(
      this.readingTodo?.title,
      Validators.required
    );
  }

  newTodoForm: FormControl = new FormControl('', Validators.required);
  editTodoForm!: FormControl;

  isOpened: boolean = false;

  createTodo() {
    this.todoService
      .addTodo(this.newTodoForm.getRawValue())
      .subscribe((data) => this.newTodo.emit(data));
  }

  deleteTodo() {
    this.todoService
      .deleteTodo(this.readingTodo!.id)
      .subscribe((data) => this.deleteTodoEmitter.emit(data));
  }

  editTodo() {
    this.todoService
      .editTodo({
        id: this.readingTodo!.id,
        title: this.editTodoForm.getRawValue(),
        isCompleted: this.readingTodo!.isCompleted,
      })
      .subscribe((newTodo) => this.editTodoEmitter.emit(newTodo));
  }
}
