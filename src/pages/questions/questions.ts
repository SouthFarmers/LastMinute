import { Component } from '@angular/core';
import {NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
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
  rows:any;
  tags: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand:Backand,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.rows = Array.from(Array(Math.ceil(4/ 2)).keys());
    this.chapter = navParams.get('chapter');
    this.subject = navParams.get('subject');
    this.getChapterQuestions();
  }

  ionViewDidLoad() {

  }

  private getChapterQuestions() {
    var tagstring: any;
    this.backand.getChapterQuestionsP(this.chapter,this.subject)
      .subscribe(
        data => {
          this.questions = [];
          this.questions = data;
          for(let j = 0; j < this.questions.length; j++)
          {
            this.backand.getQuestionTags(this.questions[j].id)
              .subscribe(
                data => {
                  tagstring = "";
                  for(let k = 0; k < data.length; k++){
                    tagstring += data[k].tag + " ";
                  }
                  this.tags="";
                  this.tags=tagstring;
                  this.questions[j].tags = tagstring;
                })

            this.backand.getQuestionImageP(this.questions[j].id)
              .subscribe(
                data2 => {
                    this.questions[j].images = data2;


                  if(j == this.questions.length-1){

                    console.log(this.questions)
                  }
                },
                err => this.logError(err)
              );
            //this.getQuestionTags(this.questions[j].qid);

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

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }


  encodeImageUri(imageUri) {
    let c=document.createElement('canvas');
    let ctx=c.getContext("2d");
    let img=new Image();
    img.onload = function(){
      c.width=img.width;
      c.height=img.height;
      ctx.drawImage(img, 0,0);
    };
    img.src=imageUri;
    let dataURL = c.toDataURL("image/jpeg");
    return dataURL;
  }
}
