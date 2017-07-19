import { UserProvider } from './../user/user';
import { Injectable } from '@angular/core';
import { Recipient } from "../../models/recipient.model";
import firebase from 'firebase';
import { Events } from "ionic-angular";

@Injectable()
export class RequestProvider {
  firedata = firebase.database().ref('/request');
  userDetails = [];

  constructor(public userProvider: UserProvider, public events: Events) {
  }

  /*
    Desc - For sending chat request to the user.Recipient's uid is created under 'request' path 
           and sender's uid is pushed under it.
    Called from - buddies.ts
    Inputs - Recipient object containing sender and recipient.
    Outputs - Promise.
  */
  sendRequest(recp: Recipient) {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(recp.recipient).push({ sender: recp.sender }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      });
    });

    return promise;
  }

  /*
    Desc - For getting user's chat request.Current user's uid is fetched from 'request' path 
           and user details list is populated.
    Called from - chat.ts
    Outputs - Promise.
  */
  getMyRequest() {
    let allMyRequest;
    var myRequest = [];

    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      allMyRequest = snapshot.val();

      myRequest = [];
      for (var i in allMyRequest)
        myRequest.push(allMyRequest[i].sender);

      this.userDetails = [];
      this.userProvider.getAllUsers().then((resp: any) => {
        var allUsers = resp;

        for (var j in myRequest)
          for (var key in allUsers) {
            if (myRequest[j] === allUsers[key].uid) {
              this.userDetails.push(allUsers[key]);
            }
          }
        this.events.publish('gotRequests');
      });
    });
  }

}
