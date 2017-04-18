import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';

/**
 * Generated class for the Modalanswer page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalanswer',
  templateUrl: 'modalanswer.html',
})
export class Modalanswer {

  ques:any;
  ans:any = "";
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) {


    this.ques = this.params.get('question');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    this.viewCtrl.dismiss(this.ans);
  }

}
