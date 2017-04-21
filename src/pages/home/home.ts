import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {ICategory} from "../../model/category";
import {ChaptersPage} from "../chapters/chapters";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subjects: ICategory[];
  rows: any;
  sem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: Backand, private storage:Storage) {
    this.sem = navParams.get('sem');
    if(this.sem == undefined){
      this.storage.get('semester')
        .then((semester) => {
          this.sem = semester;
          this.getSubjects();
        });
    }else{
      this.getSubjects();
    }
  }

  ionViewDidLoad() {
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
