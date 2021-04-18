import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCommitComponent } from './single-commit.component';

describe('SingleCommitComponent', () => {
  let component: SingleCommitComponent;
  let fixture: ComponentFixture<SingleCommitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCommitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
