import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Commit } from './commit';
import { COMMITS } from './test-commits';

@Injectable({
  providedIn: 'root'
})
export class CommitService {
  constructor() { }

  getCommits(): Observable<Commit[]> {
    const commits = of(COMMITS);
    return commits;
  }

  getCommit(sha: string): Observable<Commit> {
    const commit = COMMITS.find(c => c.sha === sha) as Commit;
    return of(commit);
  }
}
