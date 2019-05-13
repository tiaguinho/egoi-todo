import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { priorities } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  public priorities = priorities;

  get priority() {
    return this.editForm.get('priority');
  }
  get title() {
    return this.editForm.get('title');
  }
  get description() {
    return this.editForm.get('description');
  }

  editForm: FormGroup;

  constructor(
    private todo: TodoService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.editForm = this.fb.group({
        id: [''],
        priority: ['', Validators.required],
        title: ['', [Validators.minLength(5), Validators.required]],
        description: ['', Validators.required],
        created: false,
        done: [false],
      });

      this.todo
        .getTodo(params['id'])
        .subscribe(todo => this.editForm.setValue(todo), () => this.router.navigate(['todo']));
    });
  }

  selected(option, selected): boolean {
    return option.type === selected.type;
  }

  submit({ value, valid }): void {
    if (valid) {
      this.todo.edit(value.id, value).subscribe(todo => {
        if (todo) {
          this.router.navigate(['todo']);
        }
      });
    }
  }
}
