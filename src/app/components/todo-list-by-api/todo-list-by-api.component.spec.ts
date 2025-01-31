import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListByApiComponent } from './todo-list-by-api.component';

describe('TodoListByApiComponent', () => {
  let component: TodoListByApiComponent;
  let fixture: ComponentFixture<TodoListByApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListByApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListByApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
