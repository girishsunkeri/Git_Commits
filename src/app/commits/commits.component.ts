import { Component, Input, OnInit } from '@angular/core';

import { Commit } from '../commit';

import { CommitService } from '../commit.service';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  @Input() commits: Commit[] = [];

  constructor() { }

  ngOnInit(): void {
  }



}
