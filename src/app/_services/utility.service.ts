import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from './crypto.service';
import { AuthServiceService } from './auth-service.service';

@Injectable({
    providedIn:'root'
})
export class UtilityService{
    private _url = "https://my-json-server.typicode.com/vansikagupta/demo/users/"

    constructor(private http: HttpClient, private crypto: CryptoService){}

    postPassword(password: string){
        let emailId = JSON.parse(localStorage.getItem('currentUser'))['id'];
        console.log("In utility service",emailId)
        return this.http.patch(this._url+emailId, this.crypto.set(localStorage.getItem('cryptKey'), password));
    }
}