import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class ApiService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: Http) { }

  login(url, user: User, ) {
    console.log(user);
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, JSON.stringify(user), { headers: headerData })
      .map((response) => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  logout() {
    this.loggedIn.next(false);
    console.log("in logout method: " + this.loggedIn);
  }

  postData(url, postParams) {
    console.log(postParams);
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json');
    return this.http.post(url, JSON.stringify(postParams), { headers: headerData })
      .map((response) => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

}
