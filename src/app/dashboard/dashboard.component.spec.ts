import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbDate, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { CommitService } from '../commit.service';
import { Observable } from 'rxjs';
import { Commit } from '../commit';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let commitService: CommitService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        NgbModule
      ],
      declarations: [ DashboardComponent ],
      providers: [ CommitService ]
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

  it('should assign commits', fakeAsync(() => {
    component.commits = [];
    const COMMITS: Commit[] = [
      {
        sha: "c883c90cbb66e35cd1746e661d2f96f8da93fa68",
        authorName: "Devin Binnie",
        authorEmail: "52460000+devinbinnie@users.noreply.github.com",
        date: new Date("2021-04-16T20:59:05Z"),
        url: "https://api.github.com/repos/mattermost/mattermost-webapp/commits/c883c90cbb66e35cd1746e661d2f96f8da93fa68",
        message: "[MM-19327] Add keyboard shortcut to focus search bar and search in current channel (#7718)\n\n* [MM-19327] Add keyboard shortcut to focus search bar and search in current channel\r\n\r\n* Only do the Ctrl+F shortcut for desktop app > 4.7.0\r\n\r\n* Refactor search to include the button/shortcut\r\n\r\n* Merge'd\r\n\r\n* Merge'dd\r\n\r\n* Merge'd\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* Update components/search/types.ts\r\n\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* PR feedback\r\n\r\n* Added preventDefault() to stop default browser functions from overriding the new shortcut\r\n\r\nCo-authored-by: Mattermod <mattermod@users.noreply.github.com>\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>",
      },
      {
        sha: "2fdb0043e6a9fec0da06244f50d6c1af4a5c8bb7",
        authorName: "Pablo Andrés Vélez Vidal",
        authorEmail: "52460000+devinbinnie@users.noreply.github.com",
        date: new Date("2021-04-16T15:21:51Z"),
        url: "https://api.github.com/repos/mattermost/mattermost-webapp/commits/c883c90cbb66e35cd1746e661d2f96f8da93fa68",
        message: "[MM-19327] Add keyboard shortcut to focus search bar and search in current channel (#7718)\n\n* [MM-19327] Add keyboard shortcut to focus search bar and search in current channel\r\n\r\n* Only do the Ctrl+F shortcut for desktop app > 4.7.0\r\n\r\n* Refactor search to include the button/shortcut\r\n\r\n* Merge'd\r\n\r\n* Merge'dd\r\n\r\n* Merge'd\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* Update components/search/types.ts\r\n\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* PR feedback\r\n\r\n* Added preventDefault() to stop default browser functions from overriding the new shortcut\r\n\r\nCo-authored-by: Mattermod <mattermod@users.noreply.github.com>\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>",
      }
    ]
    const commitService = fixture.debugElement.injector.get(CommitService);
    spyOn(commitService, 'getCommits').and.returnValue(of(COMMITS));
    component.getCommits();
    fixture.detectChanges();
    tick();
    expect(component.commits.length).toEqual(2);
  }));

});
