import { BaseDataService } from '../../classes/base-data-service';
import { Injectable } from '@angular/core';
import { BeyondService } from 'ng-beyond';
import { User } from '../../models/user/user.model';

@Injectable()
export class UsersService extends BaseDataService {

  constructor(beyondService: BeyondService) {
    super(beyondService, User);
  }

}
