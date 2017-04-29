import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {QuestionsPage} from "../questions/questions";
import {AnswersPage} from "../answers/answers";
import {Loader} from "../../providers/loader";

@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html'
})
export class ChaptersPage {

  chapterssegment: string = "chapters";
  chapters: Array<{title: string, Id: number}>;
  questions :any;
  subjectid:any=1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand : Backand,
              public loader : Loader) {
    this.loader.presentLoading();
    this.subjectid = navParams.get('subject');
    this.chapters = [];
    for (let i = 1; i < 9; i++) {
      this.chapters.push({
        title: 'Chapter ' + i,
        Id: i
      });
    }

    this.getAllQuestions();
  }

  private getAllQuestions() {
    this.backand.getAllQuestionsP(this.subjectid)
      .subscribe(
        data => {
          this.questions = [];
          this.questions = data;
          this.loader.stopLoading();
        },
        err => this.logError(err)
      );
  }

  chapterTapped(item) {
    this.navCtrl.push(QuestionsPage, {
      chapter: item.Id,
      subject: this.subjectid
    });
  }

  questionTapped(item) {
    this.navCtrl.push(AnswersPage, {
      qid: item.id,
      question:item.question
    });
  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }
}
