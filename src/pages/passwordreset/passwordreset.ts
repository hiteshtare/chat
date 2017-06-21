import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PasswordresetPage');
  }

  passwordReset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });

    this.userProvider.resetPassword(this.email).then((resp: any) => {
      if (resp.success) {
        alert.setMessage('Password reset mail has been sent successfully.');
        alert.present();
      }
    })

  }

  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }
}
