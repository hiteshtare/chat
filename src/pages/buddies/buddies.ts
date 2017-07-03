import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  users: any;
  tempUsers: any;
  searchString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    this.userProvider.getAllUsers().then((resp) => {
      this.users = resp;
      this.tempUsers = resp;
      console.log(this.users);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddiesPage');
  }

  searchUsers(event) {
    this.users = this.tempUsers;//reassigning the user list

    var q = event.target.value;

    if (q.trim() == '') {
      return;
    }

    this.users = this.users.filter((v) => {
      if ((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1)
        return true;
      else
        return false;
    });
  }

}
