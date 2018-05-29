import { TestBed, inject } from '@angular/core/testing';

import { AccountPrefsService } from './account-prefs.service';

describe('AccountPrefsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountPrefsService]
    });
  });

  it('should be created', inject([AccountPrefsService], (service: AccountPrefsService) => {
    expect(service).toBeTruthy();
  }));
});
