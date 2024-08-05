import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  constructor(public todoService: TodoService, private changeDetection: ChangeDetectorRef) {}

  createTodoForm: FormGroup = new FormGroup({
    createTodo: new FormControl('', Validators.required),
  });

  editTodoForm = new FormControl(
    this.currentTodo?.title,
    Validators.required
  );

  ngOnInit(): void {
    console.log('inited');
    this.editTodoForm.patchValue(this.currentTodo?.title);
    this.changeDetection.detectChanges();
  }

  createTodo() {
    this.todoService
      .addTodo(this.createTodoForm.getRawValue().createTodo);
      this.changeDetection.detectChanges();
  }

  deleteTodo() {
    this.todoService
      .deleteTodo(this.currentTodo!.id);
      this.changeDetection.detectChanges();
  }

  editTodo(titleMode: boolean) {
      this.todoService
      .editTodo({
        id: this.currentTodo!.id,
        title: this.editTodoForm.getRawValue() || '',
        isCompleted: titleMode ? !this.currentTodo!.isCompleted : this.currentTodo!.isCompleted,
      });
      this.isOpened = false;
      this.changeDetection.detectChanges();
  }
}
