import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommitService } from '../../commit.service';
import { Commit } from '../../commit';

@Component({
  selector: 'app-commit-detail',
  templateUrl: './commit-detail.component.html',
  styleUrls: ['./commit-detail.component.css']
})
export class CommitDetailComponent implements OnInit {

  commit: Commit;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private commitService: CommitService) { }

  ngOnInit(): void {
    this.getCommit();
  }

  getCommit(): void {
    const sha = String(this.route.snapshot.paramMap.get('id'));
    this.commitService.getCommit(sha)
      .subscribe(commit => {
        console.log(commit);
        this.commit = commit
      })
  }

}
