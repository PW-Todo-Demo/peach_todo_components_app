import { TestBed, inject } from '@angular/core/testing';

import { TaskSchedulesService } from './task-schedules.service';

describe('TaskSchedulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskSchedulesService]
    });
  });

  it('should be created', inject([TaskSchedulesService], (service: TaskSchedulesService) => {
    expect(service).toBeTruthy();
  }));
});
