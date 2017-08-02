import { UserProvider } from './../user/user';
import { Injectable } from '@angular/core';
import { Recipient } from "../../models/recipient.model";
import firebase from 'firebase';
import { Events } from "ionic-angular";

@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/request');
  firefriends = firebase.database().ref('/friends');
  userDetails = [];
  myFriends = [];

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
      this.firereq.child(recp.recipient).push({ sender: recp.sender }).then(() => {
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

    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
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

  /*
    Desc - For accepting the chat request.Current user's uid is pushed under 'friends' path 
           with buddy's uid and vice-versa.
    Called from - chat.ts
    Inputs - Buddy object containing a user detail.
    Outputs - Promise.
  */
  acceptRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firefriends.child(firebase.auth().currentUser.uid).push(
        { uid: buddy.uid }
      ).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        });
      }).then(() => {
        this.deleteRequest(buddy).then(() => {
          resolve({ succuss: true });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  }

  /*
    Desc - For deleting the chat request.Current user's uid is used to remove from 'friends' path.
    Called from - chat.ts
    Inputs - Buddy object containing a user detail.
    Outputs - Promise.
  */
  deleteRequest(buddy) {
    var promise = new Promise((resolve, reject) => {

      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let tempStore = snapshot.val();
        let somekey = Object.keys(tempStore);

        this.firereq.child(firebase.auth().currentUser.uid).child(somekey[0]).remove().then(() => {
          resolve({ success: true });
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
    Desc - For getting user's friends.Current user's uid is fetched from 'request' path 
           and user details list is populated.
    Called from - chat.ts
    Outputs - Promise.
  */
  getMyFriends() {
    let myAllFriends;
    var myFriendsuid = [];

    var promise = new Promise((resolve, reject) => {

      this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        myAllFriends = snapshot.val();

        myFriendsuid = [];

        for (var i in myAllFriends)
          myFriendsuid.push(myAllFriends[i].uid);

        this.myFriends = [];
        this.userProvider.getAllUsers().then((resp: any) => {
          var allUsers = resp;

          for (var j in myFriendsuid)
            for (var key in allUsers) {
              if (myFriendsuid[j] === allUsers[key].uid) {
                this.myFriends.push(allUsers[key]);
              }
            }

          console.log(this.myFriends);
          this.events.publish('friends');
        })
      });
    });
    return promise;
  }

}
