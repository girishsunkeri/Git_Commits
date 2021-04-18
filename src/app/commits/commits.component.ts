import { Component, OnInit } from '@angular/core';

import { COMMITS } from '../test-commits'
import { Commit } from '../commit';

import { CommitService } from '../commit.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  commits: Commit[] = [];
  selectedCommit?: Commit;

  constructor(private commitService: CommitService) { }

  ngOnInit(): void {
    this.getCommits();
  }

  showCommit(commit: Commit): void {
    this.selectedCommit = commit;
  }

  getCommits(): void {
    this.commitService.getCommits()
      .subscribe(commits => this.commits = commits);
  }

}
