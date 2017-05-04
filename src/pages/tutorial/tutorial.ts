import { Component, ViewChild } from '@angular/core';

import {MenuController, NavController, Slides, Nav, App} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {HomePage} from "../home/home";



@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  @ViewChild(Nav) nav: Nav;
  showSkip = true;
  sem: string = "oneone";
  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public app: App
  ) { }

  startApp() {
    this.storage.set('semester', this.sem).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
      this.app.getRootNav().setRoot(HomePage);
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
