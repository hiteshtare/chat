import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCred } from "./usercred";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credetials = {} as UserCred;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.authProvider.login(this.credetials).then((resp: any) => {
      if (!resp.code) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(resp);
      }
    });
  }

  public passwordReset() {
  }

  public signUp() {
    this.navCtrl.push('SignupPage');
  }
}