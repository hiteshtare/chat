import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { UserCred } from "../../pages/login/usercred";

@Injectable()
export class AuthProvider {

  constructor(public aFireAuth: AngularFireAuth) {
    //console.log('Hello AuthProvider Provider');
  }

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
