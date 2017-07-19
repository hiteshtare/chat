import { Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestProvider: RequestProvider,
    public events: Events) {
  }

  ionViewWillEnter() {
    this.requestProvider.getMyRequest();
    this.events.subscribe('gotRequests', () => {
      this.myRequest = [];
      this.myRequest = this.requestProvider.userDetails;
    });
  }

  ionViewWillLeave(){
    this.events.unsubscribe('gotRequests');
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  acceptRequest(request) {
    console.log("acceptRequest :-)");
  }

  rejectRequest(request) {
    console.log("rejectRequest :-(");
  }
}
