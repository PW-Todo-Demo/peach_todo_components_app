import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BeyondService} from 'ng-beyond';

const API_KEY = 'account_prefs';

@Injectable()
export class AccountPrefsService {

  private beyondService: BeyondService;
  private resource: any;

  constructor(beyondService: BeyondService) {
    this.beyondService = beyondService;
    this.resource = this.beyondService.api.resource(API_KEY, {useCoreToken: true});
  }

  public save(data: any = {}): Observable<any> {
    return this.resource.save(data);
  }

}
