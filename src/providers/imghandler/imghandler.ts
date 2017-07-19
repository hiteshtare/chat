import { Injectable } from '@angular/core';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import firebase from 'firebase';

@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  imgsource: any;

  constructor(public fileChooser: FileChooser) {
  }

  /*
    Desc - For uploading Image on Firebase platform using File, FileChooser & FilePath native-plugin.
           Image is stored under 'profileimages' path with the name equal to the uid of the current user.
    Called from - profile.ts 
    Outputs - Promise.
  */
  uploadImage() {
    var promise = new Promise((resolve, reject) => {

      this.fileChooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {

                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {

                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    resolve(url);
                  }).catch((err) => {
                    reject(err);
                  });
                }).catch((err) => {
                  reject(err);
                });
              }
            });
          });
        });
      });

    });
    return promise;
  }
}
