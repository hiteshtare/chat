import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { ImghandlerProvider } from "../../providers/imghandler/imghandler";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public avatar: string;
  public displayName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public zone: NgZone, public alertCtrl: AlertController, public toastCtrl: ToastController, public imghandlerProvider: ImghandlerProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userProvider.getUserDetails().then((resp: any) => {
      this.displayName = resp.displayName;
      this.zone.run(() => {
        this.avatar = resp.photoURL;
      });
    }).catch((err) => {
      console.log('Error : ' + err);
    });
  }

  editDisplayName() {
    let alert = this.alertCtrl.create({
      title: 'Edit Display Name',
      inputs: [{
        name: 'displayName',
        type: 'text',
        placeholder: 'Display Name'
      }],
      buttons: [{
        text: 'Cancel', role: 'cancel', handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Update',
        handler: data => {

          let toast = this.toastCtrl.create({
            duration: 3000
          });

          this.userProvider.updateUserDetails(data.displayName).then((resp: any) => {
            if (resp.success) {
              this.displayName = data.displayName;
              toast.setMessage('Display name has been updated successfully.');
              toast.present();
            }
          }).catch((err) => {
            console.log('Error : ' + err);
            toast.setMessage('Display name is not updated.');
            toast.present();
          });
        }
      }
      ]
    });
    alert.present();
  }

  logout() {
    this.userProvider.signOutUser().then((resp: any) => {
      if (resp.success) {
        this.navCtrl.parent.parent.setRoot('LoginPage');
      } else {
        alert(resp);
      }
    }).catch((err) => {
      console.log('Error : ' + err);
    });
  }

  editProfilePic() {
    this.imghandlerProvider.uploadImage().then((uploadedUrl: any) => {

      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
      loader.present();
      this.userProvider.updateImage(uploadedUrl).then((res: any) => {
        loader.dismiss();
        if (res.success) {
          this.zone.run(() => {
            this.avatar = uploadedUrl;
          });
        }
        else {
          alert(res);
        }
      });
    });
  }
}
