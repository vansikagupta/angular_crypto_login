import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptoService } from './crypto.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>; //other components can subscribe to get notified about current user
  private _url = "https://my-json-server.typicode.com/vansikagupta/demo/users/"
  
  constructor(private http: HttpClient, private cryptoJs : CryptoService) { 
    localStorage.setItem('cryptKey','pk#91@01');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser);
    /*The public currentUser property is then set to this.currentUserSubject.asObservable(); 
    which allows other components to subscribe to the currentUser Observable but doesn't allow them
     to publish to the currentUserSubject, 
    this is so logging in and out of the app can only be done via the authentication service.*/
  }

  getPassword(emailId) : Observable<any> {
    //`${config.apiUrl}/users/authenticate`
    return this.http.get<any>(this._url+emailId);
  }

  login(emailId, input_password) {
    return this.http.get<any>(this._url+emailId).pipe(map(
      user => {
        if(input_password === this.cryptoJs.get(localStorage.getItem('cryptKey'), user.password)){
            console.log("logged in");
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user); //this will notify currentUser property 
            console.log(this.currentUser);
            console.log("current User:" + localStorage.getItem('currentUser'))
        }
      }
    ));
  }

  //convenience getter for easy access to currently logged user value
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(){

  }
}
