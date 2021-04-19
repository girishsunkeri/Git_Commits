import { Component, OnInit } from '@angular/core';

import { Commit } from '../commit';

import { CommitService } from '../commit.service';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  commits: Commit[] = [];
  selectedCommit?: Commit;
  tempStart: Date = new Date();
  tempEnd: Date = new Date();
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  page: number = 1;
  dateError: boolean;
  maxDate: {year: number; month: number; day: number};

  constructor(private commitService: CommitService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.maxDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    }

    console.log(this.maxDate);


    this.tempStart.setDate(0);
    this.tempStart.setDate(1);
    this.tempEnd.setDate(0);
    this.startDate = new NgbDate(this.tempStart.getFullYear(), this.tempStart.getMonth() + 1, this.tempStart.getDate());
    this.endDate = new NgbDate(this.tempEnd.getFullYear(), this.tempEnd.getMonth() + 1, this.tempEnd.getDate());
    this.getCommits();
  }

  showCommit(commit: Commit): void {
    this.selectedCommit = commit;
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
   });
  }

  isDateRangeValid(): boolean {
    const selectedStartdate = new Date(this.startDate.year, this.startDate.month, this.startDate.day);
    const selectedEnddate = new Date(this.endDate.year, this.endDate.month, this.endDate.day);

    if(selectedStartdate < selectedEnddate) {
      return true;
    }

    return false;
  }

  onSearchClicked() {
    this.page = 1;
    this.dateError = false;
    if(this.isDateRangeValid()) {
      this.getCommits();
    } else {
      this.dateError = true;
    }

  }

  getCommits(): void {
    this.commitService.getCommits(this.startDate, this.endDate, this.page)
      .subscribe((commits: Commit[]) => this.commits = commits);
  }

  getNewer(): void {
    this.page = this.page - 1;
    this.getCommits();
    this.scrollToTop();
  }

  getOlder(): void {
    this.page = this.page + 1;
    this.getCommits();
    this.scrollToTop();
  }

}
