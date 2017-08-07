import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {
  fireBuddyChats = firebase.database().ref('/buddyChats');

  buddy: any;
  buddyMessages = [];

  constructor(public events: Events) {
  }

  public inintializeBuddyChat(buddy) {
    this.buddy = buddy;
  }

  public addMessage(msg) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.fireBuddyChats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentBy: this.buddy.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.fireBuddyChats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentBy: this.buddy.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          });
          resolve(true);
        }).catch((err) => {
          reject(err);
        });
      });
      return promise;
    }
  }

  public getAllMessages() {
    let temp;

    this.fireBuddyChats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      temp = snapshot.val();
      let buddyMessages = [];

      for (var key in temp)
        buddyMessages.push(temp[key]);

      this.buddyMessages = buddyMessages;

      this.events.publish('newmessage');
    });
  }
}
