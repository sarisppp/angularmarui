import { TestBed } from '@angular/core/testing';

import { RegisterCourseService } from './register-course.service';

describe('RegisterCourseService', () => {
  let service: RegisterCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
