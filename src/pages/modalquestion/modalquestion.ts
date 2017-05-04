import { Component } from '@angular/core';
import { NavParams, Platform, ViewController,ActionSheetController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Backand} from "../../providers/backand";
//import {Camera} from "ionic-native";



@Component({
  selector: 'page-modalquestion',
  templateUrl: 'modalquestion.html',
})
export class Modalquestion {

  ques:any;
  images: any;
  data:any;
  rows: any;
  tags: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    public backand: Backand) {
    this.images =[];

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    this.data = {
      ques: this.ques,
      img : this.images,
      tags: this.tags
    }
    this.viewCtrl.dismiss(this.data);
  }


  takePicture(){

    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500
    }

    this.camera.getPicture(options).then((imageData) => {
      this.images.push("data:image/jpeg;base64," + imageData);
      console.log(this.images);
    }, (err) => {
      console.log(err);
    });
  }



  getLibrary(){
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }

    this.camera.getPicture(options).then((imageData) => {
      this.images.push("data:image/jpeg;base64," + imageData);
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

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

  convertToDataURLviaCanvas(url, outputFormat){
    return new Promise( (resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
        let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        canvas = null;
        resolve(dataURL);
        };
      img.src = url;
    });
  }





}
