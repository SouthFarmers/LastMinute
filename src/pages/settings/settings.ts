import {Component} from '@angular/core';
import {ViewController, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  sem: string = "oneone";
  constructor(public viewCtrl: ViewController,
              public app:App,
              public storage: Storage) {
    this.storage.get('semester')
      .then((semester) => {
        this.sem = semester;
      });
  }

  ionViewDidLoad() {
  }

  close(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.storage.set('semester', this.sem).then(() => {
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot(HomePage);
    });

  }
}
