import { Component, Input, OnInit } from '@angular/core';

import { Commit } from '../../commit';

@Component({
  selector: 'app-single-commit',
  templateUrl: './single-commit.component.html',
  styleUrls: ['./single-commit.component.css']
})
export class SingleCommitComponent implements OnInit {

  @Input() commit!: Commit;
  constructor() { }

  ngOnInit(): void {
  }

}
