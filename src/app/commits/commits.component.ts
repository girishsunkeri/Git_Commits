import { Component, OnInit } from '@angular/core';

import { COMMITS } from '../test-commits'
import { Commit } from '../commit';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  commits = COMMITS;
  selectedCommit?: Commit;

  constructor() { }

  ngOnInit(): void {
  }

  showCommit(commit: Commit): void {
    this.selectedCommit = commit;
  }

}
