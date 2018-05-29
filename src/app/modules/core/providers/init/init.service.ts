import { AccountPrefsService } from '../account-prefs/account-prefs.service';
import { ACCT_PREF_KEY_FOR_OVERDUE_TASKS_TASK_SCHEDULE, APP_ID, APP_PERMISSIONS, OVERDUE_TASKS_TASK_ID, OVERDUE_TASKS_TASK_SCHEDULE } from '../../../../app.const';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BeyondService } from 'ng-beyond';
import { TaskSchedulesService } from '../task-schedules/task-schedules.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class InitService {

  private accountPrefsService: AccountPrefsService;
  private beyondService: BeyondService;
  private taskSchedulesService: TaskSchedulesService;

  private accountInfo: object;
  private initialized: Observable<boolean>;
  private permissions: object;
  private userInfo: object;

  constructor(accountPrefsService: AccountPrefsService, beyondService: BeyondService, taskSchedulesService: TaskSchedulesService) {

    this.accountPrefsService = accountPrefsService;
    this.beyondService = beyondService;
    this.taskSchedulesService = taskSchedulesService;
    this.beyondService.afterBeyondAppReady(); // important to call this on app bootstrap

    this.accountInfo = {};
    this.permissions = _.zipObject(
      APP_PERMISSIONS,
      _.map(
        APP_PERMISSIONS,
        () => {
          return false;
        }
      )
    );
    this.userInfo = {};

    this.initialized = this.activate();

  }

  private activate(): Observable<boolean> {

    let initialData: Array<any> = [
      this.beyondService.account.getInfo(),
      this.beyondService.user.getInfo()
    ];
    let userIsAdmin: boolean = false;
    let permissionsPromisesMap: Array<string> = [];
    let permissionsData: Array<any> = [];

    return Observable.forkJoin(initialData)
      .mergeMap((response: any) => {

        this.accountInfo = _.get(response, 0, {});
        this.userInfo = _.get(response, 1, {});

        userIsAdmin = _.get(this.accountInfo, 'is_admin', false);
        permissionsData = _.map(
          this.permissions,
          (permission: boolean, key: string) => {
            permissionsPromisesMap.push(key);
            return this.beyondService.app.hasPermission(key);
          }
        );

        return Observable.forkJoin(permissionsData);

      })
      .mergeMap((response: any) => {

        this.permissions['is_admin'] = userIsAdmin;

        _.each(
          permissionsPromisesMap,
          (permission: string, index: number) => {
            this.permissions[permission] = _.get(response, index, false);
          }
        );

        if (userIsAdmin) {
          return this.beyondService.account.getPrefs(ACCT_PREF_KEY_FOR_OVERDUE_TASKS_TASK_SCHEDULE);
        }

        return Observable.of(false);

      })
      .mergeMap((response: any) => {

        if (
          response !== false &&
          _.get(response, 'value', 'false') === 'false'
        ) {

          return this.taskSchedulesService.load({task_id: OVERDUE_TASKS_TASK_ID})
            .mergeMap((response) => {

              if (response.count === 0) {
                return this.taskSchedulesService.save(OVERDUE_TASKS_TASK_SCHEDULE);
              }

              return Observable.of(true);

            })
            .mergeMap(() => {

              return this.accountPrefsService.save({
                app_id: APP_ID,
                key: ACCT_PREF_KEY_FOR_OVERDUE_TASKS_TASK_SCHEDULE,
                value: true
              });

            });

        } else {

          return Observable.of(true);

        }

      })
      .shareReplay();

  }

  public getAccountInfo(): Observable<object> {

    return this.isReady()
      .mergeMap(() => {
        return Observable.of(_.cloneDeep(this.accountInfo));
      });

  }

  public getPermissions(): Observable<object> {

    return this.isReady()
      .mergeMap(() => {
        return Observable.of(_.cloneDeep(this.permissions));
      });

  }

  public getUserInfo(): Observable<object> {

    return this.isReady()
      .mergeMap(() => {
        return Observable.of(_.cloneDeep(this.userInfo));
      });

  }

  public isReady(): Observable<boolean> {
    return this.initialized;
  }

}
