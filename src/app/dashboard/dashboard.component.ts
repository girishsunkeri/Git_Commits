import { Component, OnInit } from '@angular/core';

import { Commit } from '../commit';

import { CommitService } from '../commit.service';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  commits: Commit[] = [];
  lastCommits: Commit[] = [];
  tempStart: Date = new Date();
  tempEnd: Date = new Date();
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  page: number = 1;
  dateError: boolean;
  maxDate: {year: number; month: number; day: number};

  constructor(private commitService: CommitService) { }

  ngOnInit(): void {

    // Setting startDate and endDate to 
    // previous months first and last day
    const currentDate = new Date();
    this.maxDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    }

    // set date to last day of previous month
    this.tempStart.setDate(0);
    //set date to first day of a month
    this.tempStart.setDate(1);
    this.tempEnd.setDate(0);
    this.startDate = new NgbDate(this.tempStart.getFullYear(), 
                      this.tempStart.getMonth() + 1,
                       this.tempStart.getDate());

    this.endDate = new NgbDate(this.tempEnd.getFullYear(), 
                      this.tempEnd.getMonth() + 1, 
                      this.tempEnd.getDate());
    this.getCommits();
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
      .subscribe((commits: Commit[]) => {
        if(this.page > 1 && commits.length === 0) {
          this.lastCommits = [...this.commits];
        } 
        this.commits = commits
        
      });
  }

  getNewerCommits(): void {
    this.page = this.page - 1;
    this.getCommits();
    this.scrollToTop();
  }

  getOlderCommits(): void {
    this.page = this.page + 1;
    this.getCommits();
    this.scrollToTop();
  }

  // displayed on click ob back button when no more commits to show
  displayLastCommits(): void {
    this.page = this.page - 1;
    this.commits = [...this.lastCommits];
  }

}
