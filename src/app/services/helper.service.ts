import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HelperService {
  invokeEvent: Subject<any> = new Subject();

  userObj: any;

  constructor() { }

  callMethodOfSecondComponent(someValue) {

    this.invokeEvent.next(someValue)
  }

}
