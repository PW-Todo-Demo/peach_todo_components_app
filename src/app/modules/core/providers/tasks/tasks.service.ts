import { BaseDataService } from '../../classes/base-data-service';
import { Injectable } from '@angular/core';
import { BeyondService } from 'ng-beyond';
import { Task } from '../../models/task/task.model';

@Injectable()
export class TasksService extends BaseDataService {

  constructor(beyondService: BeyondService) {
    super(beyondService, Task);
  }

}
