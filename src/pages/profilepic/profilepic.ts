import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from "../../providers/imghandler/imghandler";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  imgUrl = 'https://firebasestorage.googleapis.com/v0/b/chat-39e2e.appspot.com/o/img_placeholder.jpg?alt=media&token=c3a1df26-8b09-4cc8-84d2-3ba66f499733';
  moveOn = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imghandlerProvider: ImghandlerProvider,
    public userProvider: UserProvider, public loadingCtrl: LoadingController, public zone: NgZone) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilepicPage');
  }

  chooseImage() {
    this.imghandlerProvider.uploadImage().then((uploadedUrl: any) => {
      this.zone.run(() => {
        this.imgUrl = uploadedUrl;
        this.moveOn = false;
      });
    })

  }

  uploadProceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userProvider.updateImage(this.imgUrl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }
}
