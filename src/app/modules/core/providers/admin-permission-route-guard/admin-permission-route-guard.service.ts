import { APP_PERMISSION_TODO_ADMIN_API_KEY } from '../../../../app.const';
import { CanActivate } from "@angular/router";
import { InitService } from '../init/init.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdminPermissionRouteGuardService implements CanActivate {

  private initService: InitService;

  constructor(initService: InitService) {
    this.initService = initService;
  }

  public canActivate(): Observable<boolean> {

    return this.initService.getPermissions()
      .catch(() => {
        return Observable.of(false);
      })
      .flatMap((permissions) => {
        return Observable.of(permissions[APP_PERMISSION_TODO_ADMIN_API_KEY]);
      })

  }

}
