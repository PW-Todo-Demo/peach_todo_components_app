import { APP_PERMISSION_TODO_ADMIN_API_KEY, DEFAULT_INFO_TIMEOUT, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_INFO } from '../../app.const';
import {Component, ErrorHandler, OnInit, ViewChild} from '@angular/core';
import { InitService } from '../../modules/core/providers/init/init.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';
import { Router } from '@angular/router';
import { TasksService } from '../../modules/core/providers/tasks/tasks.service';
import { Task } from '../../modules/core/models/task/task.model';
import * as _ from 'lodash';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import {SearchComponent} from 'ng-beyond';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private errorHandler: ErrorHandler;
  private initService: InitService;
  private router: Router;
  private tasksService: TasksService;

  public blockers: {[k: string]: boolean|number};
  public info: {[k: string]: string};
  public permissions: {[k: string]: boolean} | {};
  public tasksEditingAllowed: boolean;
  public tasks: Array<Task>;
  public visibleTasks: Array<Task>;
  public userInfo: object;
  public percentComplete = 0;
  @ViewChild('search') search: SearchComponent;

  constructor(errorHandler: ErrorHandler, initService: InitService, router: Router, tasksService: TasksService) {

    this.errorHandler = errorHandler;
    this.initService = initService;
    this.router = router;
    this.tasksService = tasksService;

    this.blockers = {
      api_processing: false,
      initializing: true,
      task: false
    };
    this.info = {
      message: null,
      type: MESSAGE_TYPE_INFO
    };
    this.permissions = {};
    this.tasksEditingAllowed = false;
    this.tasks = [];
    this.userInfo = {};

  }

  public ngOnInit(): void {

    Observable.forkJoin([
      this.initService.getPermissions(),
      this.initService.getUserInfo()
    ])
      .mergeMap((response) => {

        this.permissions = _.get(response, 0, {});
        this.userInfo = _.get(response, 1, {});
        this.tasksEditingAllowed = Boolean(this.permissions[APP_PERMISSION_TODO_ADMIN_API_KEY]);

        const filters: object = !this.permissions[APP_PERMISSION_TODO_ADMIN_API_KEY] ?
          {assigned_user_id: _.get(this.userInfo, 'id', 0)} :
          null;

        return this.tasksService.load(filters, {includes: 'users(id,first_name,last_name)'});

      })
      .catch((error: any) => {
        this.handleError(error);
        return Observable.empty();
      })
      .subscribe((tasks: Array<Task>) => {
        this.tasks = tasks;
        this.updateVisibleTasks('');
        this.updatePercentComplete();
        this.blockers.initializing = false;
        return;
      });
    this.search.queryChange.debounceTime(500).subscribe(t => this.updateVisibleTasks(t));
  }

  public actionOpenTaskModal(taskId: string | number = 'new'): void {

    if (this.tasksEditingAllowed) {
      this.router.navigate(['todo', taskId]);
    }

  }

  public onTaskStatusChange(task: Task = null): void {

    if (
      !this.blockers.initializing &&
      this.blockers.task !== task.id
    ) {

      task.toggleStatus();
      this.blockers.task = task.id;

      this.tasksService.save(task)
        .catch((error) => {
          this.handleError(error, true);
          return Observable.empty();
        })
        .finally(() => {
          this.updatePercentComplete();
          this.blockers.task = false;
        })
        .subscribe();

    }

  }

  private updatePercentComplete(): void {
    if (this.tasks.length) {
      this.percentComplete = Math.round((this.getTasksCompleteCount() / this.tasks.length) * 100);
    }
  }

  private getTasksCompleteCount(): number {
    let completeCount = 0;
    _.forEach(this.tasks, (t) => {if (t.isComplete) {completeCount++; }});
    return completeCount;
  }

  private updateVisibleTasks(query) {
    if (query) {
      this.visibleTasks = _.filter(this.tasks, t => t.description.indexOf(query) !== -1);
    } else {
      this.visibleTasks = this.tasks;
    }
  }

  private handleError(error: any = null, autoHide: boolean = false): void {

    let message = 'There was an error, please check console log for more details.'; // default message

    if (_.isString(error)) {
      message = `There was an error: ${error}`;
    } else if (_.isObject(error) && _.has(error, 'message')) {
      message = error.message;
    }

    this.errorHandler.handleError(error);
    this.showInfo({
      message: message,
      type: MESSAGE_TYPE_ERROR
    });

    if (autoHide) {

      setTimeout(
        () => {
          this.showInfo(); // will hide message when called with no params
          return;
        },
        DEFAULT_INFO_TIMEOUT
      );

    }

  }

  private showInfo(info: {[k: string]: string} = {message: null, type: MESSAGE_TYPE_INFO}): void {
    this.info = info;
    return;
  }

}
