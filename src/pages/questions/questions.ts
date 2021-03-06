import { Component } from '@angular/core';
import {NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {AnswersPage} from "../answers/answers";
import {Modalquestion} from "../modalquestion/modalquestion";
import {Loader} from "../../providers/loader";

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
  rows:any;
  tempquestions:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand:Backand,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public loader : Loader) {
    this.loader.presentLoading();
    this.rows = Array.from(Array(Math.ceil(4/ 2)).keys());
    this.chapter = navParams.get('chapter');
    this.subject = navParams.get('subject');
    this.getChapterQuestions();
  }

  private getChapterQuestions() {
    this.backand.getChapterQuestionsP(this.chapter,this.subject)
      .subscribe(
        data => {
          this.questions = [];
          this.tempquestions = [];
          this.questions = data;
          this.tempquestions = data;
          for(let j = 0; j < this.questions.length; j++)
          {
            this.backand.getQuestionTags(this.questions[j].id)
              .subscribe(
                data => {
                  this.questions[j].tags = data;
                  this.tempquestions[j].tags = data;
                })

            this.backand.getQuestionImageP(this.questions[j].id)
              .subscribe(
                data2 => {
                    this.questions[j].images = data2;
                    this.tempquestions[j].images = data2;
                    //console.log(this.questions);
                    this.loader.stopLoading();
                },
                err => this.logError(err)
              );
          }
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

      if(data != undefined){
      this.backand.addQuestionP(data.ques, this.chapter,this.subject)
        .subscribe(
          data2 => {
            this.backand.addQuestionTag(data2[0].id, data.tags)
              .subscribe(
                somedata => {});

            if(data.img.length > 0) {
              for (let i = 0; i < data.img.length; i++) {
                this.backand.uploadQuestionImageP(data2[0].id, data.img[i])
                  .subscribe(
                    data3 => {

                      if(i == data.img.length-1) {
                        let toast = this.toastCtrl.create({
                          message: 'Question Added!',
                          duration: 3000,
                          position: 'bottom'
                        });

                        toast.present(toast);
                        this.getChapterQuestions();
                      }

                    },
                    err => this.logError(err)
                  );
              }
            }else{
              let toast = this.toastCtrl.create({
                message: 'Question Added!',
                duration: 3000,
                position: 'bottom'
              });

              toast.present(toast);
              this.getChapterQuestions();
            }
          },

          err => this.logError(err)
        );


      }
    })
  }

  public searchQuestion(ev){

    var val = ev.target.value;
    this.questions = this.tempquestions;

    if (val && val.trim() != '') {
      this.questions = this.questions.filter((item) => {
        return (item.question.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

}
