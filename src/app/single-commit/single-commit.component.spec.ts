import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Commit } from '../commit';
import { SingleCommitComponent } from './single-commit.component';

describe('SingleCommitComponent', () => {
  let component: SingleCommitComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponentWrapper,
        SingleCommitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'test-component-wrapper',
    template: '<app-single-commit [commit]="commit"></app-single-commit>'
  })
  class TestComponentWrapper {
    commit: Commit = {
      sha: "c883c90cbb66e35cd1746e661d2f96f8da93fa68",
      authorName: "Devin Binnie",
      authorEmail: "52460000+devinbinnie@users.noreply.github.com",
      date: new Date("2021-04-16T20:59:05Z"),
      url: "https://api.github.com/repos/mattermost/mattermost-webapp/commits/c883c90cbb66e35cd1746e661d2f96f8da93fa68",
      message: "[MM-19327] Add keyboard shortcut to focus search bar and search in current channel (#7718)\n\n* [MM-19327] Add keyboard shortcut to focus search bar and search in current channel\r\n\r\n* Only do the Ctrl+F shortcut for desktop app > 4.7.0\r\n\r\n* Refactor search to include the button/shortcut\r\n\r\n* Merge'd\r\n\r\n* Merge'dd\r\n\r\n* Merge'd\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* Update components/search/types.ts\r\n\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>\r\n\r\n* Update components/search/search.tsx\r\n\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\n\r\n* PR feedback\r\n\r\n* Added preventDefault() to stop default browser functions from overriding the new shortcut\r\n\r\nCo-authored-by: Mattermod <mattermod@users.noreply.github.com>\r\nCo-authored-by: Caleb Roseland <caleb@calebroseland.com>\r\nCo-authored-by: Michel Engelen <32863416+michelengelen@users.noreply.github.com>",
    }
  }
});
