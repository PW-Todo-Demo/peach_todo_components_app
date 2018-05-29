import { AccountPrefsService } from './providers/account-prefs/account-prefs.service';
import { AdminPermissionRouteGuardService } from './providers/admin-permission-route-guard/admin-permission-route-guard.service';
import { CommonModule } from '@angular/common';
import { InitService } from './providers/init/init.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgBeyondModule } from 'ng-beyond';
import { TaskSchedulesService } from './providers/task-schedules/task-schedules.service';
import { TasksService } from './providers/tasks/tasks.service';
import { UsersService } from './providers/users/users.service';

@NgModule({
  imports: [
    CommonModule,
    NgBeyondModule.forRoot()
  ],
  providers: [
    AccountPrefsService,
    AdminPermissionRouteGuardService,
    InitService,
    TaskSchedulesService,
    TasksService,
    UsersService
  ],
  exports: [NgBeyondModule]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
