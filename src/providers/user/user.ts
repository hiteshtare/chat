import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/chatusers');

  constructor(public aFireAuth: AngularFireAuth) {
    //console.log('Hello UserProvider Provider');
  }

  createNewUser(newUser) {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
        this.aFireAuth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(this.aFireAuth.auth.currentUser.uid).set({
            uid: this.aFireAuth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL: ''
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err)
          });
        }).catch((err) => {
          reject(err)
        });
      }).catch((err) => {
        reject(err)
      });
    });

    return promise;
  }

}
