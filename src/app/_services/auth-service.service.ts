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
  public currentUser: Observable<any>;
  private _url = "https://my-json-server.typicode.com/vansikagupta/demo/users/"
  
  constructor(private http: HttpClient, private cryptoJs : CryptoService) { 
    localStorage.setItem('cryptKey','pk#91@01');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getPassword(emailId) : Observable<any> {
    //`${config.apiUrl}/users/authenticate`
    return this.http.get<any>(this._url+emailId);
  }

  login(emailId, input_password) {
    //var password : string;
    this.getPassword(emailId).subscribe(
      user => {
        //console.log("Password from DB : "+ user.password);
        //password = user.password;
        //console.log(password)
        if(input_password === this.cryptoJs.get(localStorage.getItem('cryptKey'), user.password)){
            console.log("logged in");
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log("current User:" + localStorage.getItem('currentUser'))
        }
      }
    )
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getKey(){

  }

  isAuthenticated(){

  }
}
