import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TodoComponent implements OnInit {
  @Input() currentTodo?: Todo;

  isOpened: boolean = false;

  constructor(public todoService: TodoService) {}

  createTodoForm: FormGroup = new FormGroup({
    createTodo: new FormControl('', Validators.required),
  });

  editTodoForm = new FormControl(
    this.currentTodo?.title,
    Validators.required
  );

  ngOnInit(): void {
    this.editTodoForm.patchValue(this.currentTodo?.title);
  }

  createTodo() {
    this.todoService
      .addTodo(this.createTodoForm.getRawValue().createTodo);
      this.createTodoForm.reset();
  }

  deleteTodo() {
    if(this.currentTodo) {
      this.todoService
      .deleteTodo(this.currentTodo.id);
    }
  }

  editTodo(titleMode: boolean) {
    if(this.currentTodo) {
      this.todoService
      .editTodo({
        id: this.currentTodo.id,
        title: this.editTodoForm.getRawValue() || '',
        completed: titleMode ? !this.currentTodo.completed : this.currentTodo.completed,
      });
      this.isOpened = false;
    }
  }

  changeIsOpened() {
    this.isOpened = true;
  }
}

