import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class ApiService {
  END_POINT = 'https://6h8ekj594f.execute-api.us-east-2.amazonaws.com/';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: Http, private httpClient: HttpClient) { }

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);  
      console.log("in login method: " + this.loggedIn);    
    }
  }

  logout() {
    this.loggedIn.next(false);
    console.log("in logout method: " + this.loggedIn);
  }

  getAllProperties() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/listings', { headers: headers })
      .map(res => res.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
    // return this.http.get(this.END_POINT+'api/listings')
    // .map(res => res.json());
  }

  // Login api
  checkAuth(loginData) {
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/login', JSON.stringify(loginData), { headers: headerData })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  // Signup api call
  signUp(signUpData) {
    console.log(signUpData);
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/signup', JSON.stringify(signUpData), { headers: headerData })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  // Signup api call
  propertyDetails(pId) {
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json')
    return this.http.get(this.END_POINT + 'api/listing?listing_id=' + pId, { headers: headerData })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  getMessages(userId) {
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json')
    return this.http.get(this.END_POINT + 'api/GetAllConversations?receiverID=' + userId, { headers: headerData })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  getConversation(chatId) {
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/json')
    return this.http.get(this.END_POINT + 'api/GetAllMessages?conversationID=' + chatId, { headers: headerData })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  updateUserDetails(userData) {

    var headers = new Headers({
      'processData': false
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.END_POINT + 'api/user/update', userData, options)
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  getUserProperties(id, type) {
    var data = { userId: id, userType: type };

    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/listings/user', data, { headers: headers })
      .map(res => res.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  referProperty(data) {
    console.log('refer property data=', data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/referListing', data, { headers: headers })
      .map(res => res.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  favoriteProperty(data) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/favoriteListing', JSON.stringify(data), { headers: headers })
      .map(res => res.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  searchListings(data: object) {
    console.log('search criteria =', data)
    const body = data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/listings', body)
      .map(res => res.json())
  }

  getListings() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.END_POINT + 'api/listings', { headers: headers })
      .map(res => res.json())

  }

  createProperty(propertyData) {
    var headers = new Headers({
      'processData': false
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.END_POINT + 'api/listing/create', propertyData, options)
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  updateProperty(propertyData) {
    var headers = new Headers({
      'processData': false
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.END_POINT + 'api/updateListing', propertyData, options)
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  deleteProperty(pId) {
    var data = { Id: pId };
    var headers = new Headers({
      'processData': false
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.END_POINT + 'api/deleteListing', data, options)
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  getAgentList() {
    return this.http.get(this.END_POINT + 'api/GetAgentListing')
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }

  postMessageToUser(senderId, receiverId, msgTxt) {
    var data = { senderId: senderId, receiverId: receiverId, msgTxt: msgTxt };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')
    console.log('data before message api', data);
    return this.http.post(this.END_POINT + 'api/PostMessage', JSON.stringify(data), { headers: headers })
      .map(response => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getMediaNews(searchData) {
    debugger;
    console.log(searchData);
    //var data = {mediaTypeId : 1};
    let mediaTypeId = { mediaTypeId : 1  };
    let INFO =  Object.assign(mediaTypeId);
    let body = JSON.stringify(INFO);
    const data = {};
    var headerData = new Headers();
    headerData.append('Content-Type', 'application/x-www-form-urlencoded');
    //headerData.append('Data-Type', 'json');
    return this.http.post(this.END_POINT + 'prod', searchData, { headers: headerData })
      .map((response) => response.json())
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });

      
      // return this.httpClient.post(this.END_POINT + 'prod', JSON.stringify({mediaTypeId: "1"}), {
      //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      //   }).map((response: Response) => {
      //     // login successful if there's a jwt token in the response
      //     console.log(response.json());
      //   }).catch((error: Response) => {
      //     if (error.status === 404) {
      //       return Observable.throw(error);
      //     }
      //     return Observable.throw(error);
      //   });
  }

}
