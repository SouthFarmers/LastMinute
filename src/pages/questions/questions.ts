import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, Platform, ModalController, ToastController} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {AnswersPage} from "../answers/answers";
import {Modalquestion} from "../modalquestion/modalquestion";

/**
 * Generated class for the Questions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  chapter;any;
  subject:any;
  questions :any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand:Backand,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.chapter = navParams.get('chapter');
    this.subject = navParams.get('subject');
    this.getChapterQuestions();
  }

  ionViewDidLoad() {

  }

  private getChapterQuestions() {
    this.backand.getChapterQuestionsP(this.chapter,this.subject)
      .subscribe(
        data => {
          this.questions = [];
          this.questions = data;
        },
        err => this.logError(err)
      );
  }

  questionSelected(item) {
    this.navCtrl.push(AnswersPage, {
      qid: item.id,
      question:item.question
    });
  }

  addQuestionModal(){

    let modal = this.modalCtrl.create(Modalquestion);
    modal.present();
    modal.onDidDismiss(data=>{
      this.backand.addQuestionP(data, this.chapter,this.subject)
        .subscribe(
          data => {
            let toast = this.toastCtrl.create({
              message: 'Question Added!',
              duration: 3000,
              position: 'bottom'
            });

            toast.present(toast);
            this.getChapterQuestions();
          },
          err => this.logError(err)
        );
    })
  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }
}

