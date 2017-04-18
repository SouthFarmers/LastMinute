import { Component } from '@angular/core';
import { NavParams, Platform, ViewController,ActionSheetController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImagePicker } from 'ionic-native';

/**
 * Generated class for the Modalquestion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalquestion',
  templateUrl: 'modalquestion.html',
})
export class Modalquestion {

  ques:any;
  public base64Image: string;
  images: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController) {
    this.images =[];

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    this.viewCtrl.dismiss(this.ques);
  }


  takePicture(){


    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 540,
      targetHeight: 540
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;

      this.images.push({
        title: "data:image/jpeg;base64," + imageData
      });

    }, (err) => {
      console.log(err);
    });
  }

  getLibrary(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 540,
      targetHeight: 540
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;

      this.images.push({
        title: "data:image/jpeg;base64," + imageData
      });
    }, (err) => {
      console.log(err);
    });
  }

  openImageMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Add image',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Upload from Library',
          handler: () => {
            this.getLibrary();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
