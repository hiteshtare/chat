import { RequestProvider } from './../../providers/request/request';
import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { Recipient } from "../../models/recipient.model";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
  newRequest = {} as Recipient;

  filteredUsers: any;
  tempUsers: any;
  searchString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider
    , public requestProvider: RequestProvider, public AlertCtrl: AlertController) {

    this.userProvider.getAllUsers().then((resp) => {
      this.filteredUsers = resp;
      this.tempUsers = resp;
      console.log(this.filteredUsers);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddiesPage');
  }

  searchUsers(event) {
    this.filteredUsers = this.tempUsers;//reassigning the user list

    var q = event.target.value;

    if (q.trim() == '') {
      return;
    }

    this.filteredUsers = this.filteredUsers.filter((v) => {
      if ((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1)
        return true;
      else
        return false;
    });
  }

  sendRequest(recipient) {
    this.newRequest.recipient = recipient.uid;
    this.newRequest.sender = firebase.auth().currentUser.uid;

    let succesalert = this.AlertCtrl.create({ buttons: ['Ok'] });
    succesalert.setTitle('Request Sent');
    succesalert.setMessage(`Your request has been sent to ${recipient.displayName}`);

    this.requestProvider.sendRequest(this.newRequest).then((resp: any) => {
      if (resp.success == 1) {
        succesalert.present();

        let sentuser = this.filteredUsers.indexOf(recipient);
        this.filteredUsers.splice(sentuser, 1);
      }
      else {
        console.log(`resp : ${resp}`);
      }
    }).catch((err) => {
      alert(err);
    });
  }

}
