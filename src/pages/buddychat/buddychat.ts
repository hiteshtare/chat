import { ChatProvider } from './../../providers/chat/chat';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  @ViewChild('content') content: Content;

  buddy: any;
  message: any;
  allmessages = [];
  photoURL = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatProvider: ChatProvider,
    public events: Events) {
    this.buddy = this.chatProvider.buddy;
    this.scrollTo();

    this.chatProvider.getAllMessages();

    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.allmessages = this.chatProvider.buddyMessages;
      this.photoURL = firebase.auth().currentUser.photoURL;
      this.content.scrollToBottom();
    });
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
    this.events.unsubscribe('newmessage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddychatPage');
  }

  sendMessage() {
    this.chatProvider.addMessage(this.message).then(() => {
      this.content.scrollToBottom();
      this.message = '';
    });
  }

  scrollTo() {

    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);

  }

}
