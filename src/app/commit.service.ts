import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Commit } from './commit';
import { COMMITS } from './test-commits';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommitService {
  constructor(private http: HttpClient) { }

  private commitsUrl = 'https://api.github.com/repos/mattermost/mattermost-webapp/commits';  // URL to web api

  getCommits(startDate: NgbDateStruct, endDate: NgbDateStruct, pageNumber: number): Observable<Commit[]> {
    const finalUrl = `${this.commitsUrl}?since=${startDate.year}-${startDate.month}-${startDate.day}&until=${endDate.year}-${endDate.month}-${endDate.day}&page=${pageNumber}&per_page=20`;
    return this.http.get(finalUrl).
    pipe(
      map((data: any) => {
        return data.map(commit => {
          return {
            sha: commit.sha,
            authorName: commit.commit.author.name,
            authorEmail: commit.commit.author.email,
            date: new Date(commit.commit.author.date),
            message: commit.commit.message,
            url: commit.url
          }
        })
      }),
      catchError(this.errorHandler)
   )
  }

  getCommit(sha: string): Observable<Commit> {
    return this.http.get(this.commitsUrl + '/' + sha).
    pipe(
      map((commit: any) => {
        return {
          sha: commit.sha,
          authorName: commit.commit.author.name,
          authorEmail: commit.commit.author.email,
          date: new Date(commit.commit.author.date),
          message: commit.commit.message,
          url: commit.url,
          files: commit.files.map(files => files.filename)
        }
      }),
      catchError(this.errorHandler)
   )
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
