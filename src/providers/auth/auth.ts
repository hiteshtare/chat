import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { UserCred } from "../../models/usercred.model";

@Injectable()
export class AuthProvider {

  constructor(public aFireAuth: AngularFireAuth) {
  }

  /*
    Desc - For signing in with email and password on Firebase platform using AngularFireAuth service.
    Called from - login.ts
    Inputs - UserCred object containing email and password for login. 
    Outputs - Promise.
  */
  login(usercred: UserCred) {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.signInWithEmailAndPassword(usercred.email, usercred.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });

    return promise;
  }

}
