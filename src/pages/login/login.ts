import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserCred } from "./usercred";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credetials = {} as UserCred;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });

    //if (this.credetials.email != '' || this.credetials.password != '') {
      this.authProvider.login(this.credetials).then((resp: any) => {
        if (!resp.code) {
          this.navCtrl.setRoot('TabsPage');
        }
        else {
          alert.setMessage(resp);
          alert.present();
        }
      }).catch((err) => {
        alert.setTitle('Login Failed!');
        alert.setMessage('Invalid user credentials.');
        alert.present();
      });
    //}
  }

  public passwordReset() {
    this.navCtrl.push('PasswordresetPage');
  }

  public signUp() {
    this.navCtrl.push('SignupPage');
  }
}