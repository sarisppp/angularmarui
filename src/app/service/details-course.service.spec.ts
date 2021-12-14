import { TestBed } from '@angular/core/testing';

import { DetailsCourseService } from './details-course.service';

describe('DetailsCourseService', () => {
  let service: DetailsCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
