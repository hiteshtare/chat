import { ChatProvider } from './../../providers/chat/chat';
import { Events, AlertController } from 'ionic-angular';
import { RequestProvider } from './../../providers/request/request';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myRequest = [];
  myFriends = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestProvider: RequestProvider,
    public events: Events, public alertCtrl: AlertController, public chatProvider: ChatProvider) {
  }

  ionViewWillEnter() {
    this.requestProvider.getMyRequest();
    this.requestProvider.getMyFriends();

    this.events.subscribe('gotRequests', () => {
      this.myRequest = [];
      this.myRequest = this.requestProvider.userDetails;
    });

    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestProvider.myFriends;
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotRequests');
    this.events.unsubscribe('friends');
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  acceptRequest(buddy) {
    this.requestProvider.acceptRequest(buddy).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Friend added :-)',
        message: 'You have accepted request successfully.',
        buttons: ['Ok'],
      });

      alert.present();
    }).catch((err) => {
      console.log(err);
    });
  }

  rejectRequest(buddy) {
    this.requestProvider.deleteRequest(buddy).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Request Reject :-(',
        message: 'You have rejected request successfully.',
        buttons: ['Ok'],
      });

      alert.present();
    }).catch((err) => {
      console.log(err);
    });
  }

  beginChat(buddy) {
    this.chatProvider.inintializeBuddyChat(buddy);
    this.navCtrl.push('BuddychatPage');
  }
}
