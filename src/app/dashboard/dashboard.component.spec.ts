import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbDate, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        NgbModule
      ],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isDateRangeValid: should return false on invalid date range', () => {
    let testDate = new Date();
    component.startDate = new NgbDate(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
    testDate.setDate(-1);
    component.endDate = new NgbDate(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
    expect(component.isDateRangeValid()).toBeFalsy();
  });

  it('isDateRangeValid: should display error on invalid date range', () => {
    let testDate = new Date();
    component.startDate = new NgbDate(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
    testDate.setDate(-1);
    component.endDate = new NgbDate(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
    component.onSearchClicked();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.date-error').innerText).toEqual('Please check date range.');
  });

  it('should display no commits message if there are no commits', () => {
    component.commits = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.no-commits').innerText).toEqual('No commits to show.');
  });

  it('getNewerCommits: should decrement the page number', () => {
    spyOn(component, 'getCommits');
    component.page = 2;
    component.getNewerCommits();
    fixture.detectChanges();
    expect(component.page).toEqual(1);
    expect(component.getCommits).toHaveBeenCalled();
  });

  it('getNewerCommits: should increment the page number', () => {
    spyOn(component, 'getCommits');
    component.page = 2;
    component.getOlderCommits();
    fixture.detectChanges();
    expect(component.page).toEqual(3);
    expect(component.getCommits).toHaveBeenCalled();
  });
});
