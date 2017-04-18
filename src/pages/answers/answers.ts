import { Component } from '@angular/core';
import {
  NavController, NavParams, AlertController, ModalController,
  ToastController
} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {Modalanswer} from "../modalanswer/modalanswer";

/**
 * Generated class for the Answers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html',
})
export class AnswersPage {

  qid:any;
  question;any;
  answers:any;
  filterResult:any = 'upvotes';
  sortvotes:boolean = true;
  sortdate:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand:Backand,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.qid = navParams.get('qid');
    this.question = navParams.get('question');
    this.getAnswers();
  }

  ionViewDidLoad() {
  }

  private getAnswers() {
    this.backand.getAnswersP(this.qid, this.filterResult)
      .subscribe(
        data => {
          this.answers = [];
          this.answers = data;
        },
        err => this.logError(err)
      );
  }

  openFilter(){

    let alert = this.alertCtrl.create();
    alert.setTitle('Sort By');

    alert.addInput({
      type: 'radio',
      label: 'Up Votes',
      value: 'upvotes',
      checked: this.sortvotes
    });

    alert.addInput({
      type: 'radio',
      label: 'Latest',
      value: 'CreatedAt',
      checked: this.sortdate
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(data == 'CreatedAt'){
          this.sortdate = true;
          this.sortvotes =false;
        }else{
          this.sortdate = false;
          this.sortvotes = true;
        }

        this.filterResult = data;
        this.getAnswers();
      }
    });
    alert.present();

  }

  addAnswerModal(){

    let modal = this.modalCtrl.create(Modalanswer, {question: this.question});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data != undefined) {
        this.backand.addAnswersP(this.qid, data)
          .subscribe(
            data => {
              let toast = this.toastCtrl.create({
                message: 'Answer Added!',
                duration: 3000,
                position: 'bottom'
              });

              toast.present(toast);
              this.getAnswers();
            },
            err => this.logError(err)
          );
      }
    })

  }

  like(answer){
    let upv = answer.upvotes+1
    this.backand.updateVotesP(answer.id, upv)
      .subscribe(
        data => {
          this.getAnswers();
        },
        err => this.logError(err)
      );

  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }
}
