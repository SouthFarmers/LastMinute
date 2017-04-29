import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Backand} from "../../providers/backand";
import {ICategory} from "../../model/category";
import {ChaptersPage} from "../chapters/chapters";
import { Storage } from '@ionic/storage';
import {Loader} from "../../providers/loader";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subjects: ICategory[];
  rows: any;
  sem:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backand: Backand,
              private storage:Storage,
              public loadingCtrl: LoadingController, public loader : Loader) {
    this.loader.presentLoading();
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

  getChaptersList(event, item) {
    this.navCtrl.push(ChaptersPage, {
      subject: item.Id
    });
  }

  getSubjects(){

    this.backand.getSubjects(this.sem).subscribe( subjects => {
        this.subjects = subjects;
        this.rows = Array.from(Array(Math.ceil(subjects.length / 2)).keys());
        this.loader.stopLoading();
      },
      error => console.log(error));

  }

}
