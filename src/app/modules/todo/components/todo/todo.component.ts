import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../../../shared/types/interfaces';

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

  editTodoForm = new FormControl(this.currentTodo?.title, Validators.required);

  ngOnInit(): void {
    this.editTodoForm.patchValue(this.currentTodo?.title);
  }

  createTodo() {
    this.todoService.addTodo(this.createTodoForm.getRawValue().createTodo);
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.currentTodo!.id);
  }

  editTodo(titleMode: boolean) {
    this.todoService.editTodo({
      id: this.currentTodo!.id,
      title: this.editTodoForm.getRawValue() || '',
      isCompleted: titleMode
        ? !this.currentTodo!.isCompleted
        : this.currentTodo!.isCompleted,
    });
  }
}
