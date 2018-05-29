import { TestBed, inject } from '@angular/core/testing';

import { AdminPermissionRouteGuardService } from './admin-permission-route-guard.service';

describe('AdminPermissionRouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPermissionRouteGuardService]
    });
  });

  it('should be created', inject([AdminPermissionRouteGuardService], (service: AdminPermissionRouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
