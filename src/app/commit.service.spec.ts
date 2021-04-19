import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommitService } from './commit.service';

describe('CommitService', () => {
  let service: CommitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CommitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
