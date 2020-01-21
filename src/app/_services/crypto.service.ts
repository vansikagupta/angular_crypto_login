import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  set(key, value) {
    //var key = CryptoJs.enc.Utf8.parse(key);
    //var iv = CryptoJs.enc.Utf8.parse(key);
    var encrypted = CryptoJs.AES.encrypt(value.trim(), key.trim());
    return encrypted.toString();
  }

  get(key, value) {
    //var key = CryptoJs.enc.Utf8.parse(key);
    //var iv = CryptoJs.enc.Utf8.parse(key);
    //CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    var decrypted = CryptoJs.AES.decrypt(value.trim(), key.trim()).toString(CryptoJs.enc.Utf8);
    //console.log(decrypted.toString(CryptoJs.enc.Utf8));
    return decrypted;
  }
}
