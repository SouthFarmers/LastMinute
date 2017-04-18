import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {ICategory} from "../../model/category";
import {ChaptersPage} from "../chapters/chapters";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subjects: ICategory[];
  rows: any;
  sem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: Backand) {
    this.sem = navParams.get('sem');
  }

  ionViewDidLoad() {
    this.getSubjects();
  }

  getChaptersList(event, item) {
    this.navCtrl.push(ChaptersPage, {
      subject: item.Id
    });
  }

  getSubjects(){

    this.backand.getSubjects(this.sem).subscribe( subjects => {
        this.subjects = subjects;
        this.rows = Array.from(Array(Math.ceil(subjects.length / 2)).keys());
      },
      error => console.log(error));

  }

}
