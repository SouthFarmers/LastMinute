import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';

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
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    this.viewCtrl.dismiss(this.ques);
  }

}
