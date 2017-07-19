import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/chatusers');

  constructor(public aFireAuth: AngularFireAuth) {
  }

  /*
    Desc - For creating new user using email and password on Firebase platform using AngularFireAuth 
             service.
    Called from - user.ts
    Inputs - newUser object containing email, password & displayName.
    Outputs - Promise.
  */
  createNewUser(newUser) {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
        this.aFireAuth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-39e2e.appspot.com/o/img_placeholder.jpg?alt=media&token=c3a1df26-8b09-4cc8-84d2-3ba66f499733'
        }).then(() => {
          this.firedata.child(this.aFireAuth.auth.currentUser.uid).set({
            uid: this.aFireAuth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-39e2e.appspot.com/o/img_placeholder.jpg?alt=media&token=c3a1df26-8b09-4cc8-84d2-3ba66f499733'
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

  /*
    Desc - For sending password reset email using AngularFireAuth service.
    Called from - passwordreset.ts
    Inputs - email string.
    Outputs - Promise.
  */
  resetPassword(email) {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      });
    });

    return promise;
  }

  /*
    Desc - For updating image url under 'chatusers' for the current user using AngularFireAuth service.
    Called from - profilepic.ts
    Inputs - imageUrl string.
    Outputs - Promise.
  */
  updateImage(imageUrl) {
    var promise = new Promise((resolve, reject) => {

      this.aFireAuth.auth.currentUser.updateProfile({
        displayName: this.aFireAuth.auth.currentUser.displayName,
        photoURL: imageUrl
      }).then(() => {
        firebase.database().ref('/chatusers/' + firebase.auth().currentUser.uid).update({
          displayName: this.aFireAuth.auth.currentUser.displayName,
          photoURL: imageUrl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true })
        }).catch((err) => {
          reject(err);
        });

      }).catch((err) => {
        reject(err);
      });

    });

    return promise;
  }


  /*
    Desc - For getting current user details using AngularFireAuth service.
    Called from - profile.ts
    Outputs - Promise.
  */
  getUserDetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(this.aFireAuth.auth.currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  /*
    Desc - For updating displayName for the current user using AngularFireAuth service.
    Called from - profile.ts
    Inputs - displayName string.
    Outputs - Promise.
  */
  updateUserDetails(displayName: string) {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.currentUser.updateProfile({
        displayName: displayName,
        photoURL: this.aFireAuth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(this.aFireAuth.auth.currentUser.uid).set({
          uid: this.aFireAuth.auth.currentUser.uid,
          displayName: displayName,
          photoURL: this.aFireAuth.auth.currentUser.photoURL
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        }).catch((err) => {
          reject(err);
        }).catch((err) => {
          reject(err);
        });
      });
    });
    return promise;
  }


  /*
        Desc - For logging out the current user using AngularFireAuth service.
        Called from - profile.ts
        Outputs - Promise.
      */
  signOutUser() {
    var promise = new Promise((resolve, reject) => {
      this.aFireAuth.auth.signOut().then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  /*
        Desc - For getting list of users under 'chatusers' path using AngularFireAuth service.
               Removing the current user from the list.
        Called from - buddies.ts & request.ts
        Outputs - Promise.
      */
  getAllUsers() {
    var promise = new Promise((resolve, reject) => {

      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();

        delete userdata[firebase.auth().currentUser.uid]; //delete current user from the list.

        let arrtemp = [];

        for (var key in userdata) {
          arrtemp.push(userdata[key]);
        }

        resolve(arrtemp);
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

}
