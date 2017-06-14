import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUpUser = {
    email: '',
    password: '',
    displayName: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
    public loadingCtrl: LoadingController, public toasrCtrl: ToastController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    var toast = this.toasrCtrl.create({
      duration: 1000,
      position: 'bottom'
    });

    if (this.signUpUser.email == '' || this.signUpUser.password == '' || this.signUpUser.displayName == '') {
      toast.setMessage('Please fill up all fields');
      toast.present();
    }
    else if (this.signUpUser.password.length < 7) {
      toast.setMessage('Password should be more than 6 chars');
      toast.present();
    }
    else {
      loader.present();

      this.userProvider.createNewUser(this.signUpUser).then((resp: any) => {
        loader.dismiss();
        if (resp.success)
          this.navCtrl.push('ProfilepicPage');
        else
          alert('Error : ' + resp);
      });
    }
  }

  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }

}
