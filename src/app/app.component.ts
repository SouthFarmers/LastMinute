import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, ToastController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import {TutorialPage} from "../pages/tutorial/tutorial";
import {Loader} from "../providers/loader";
import {AboutPage} from "../pages/about/about";
import {SocialsharingPage} from "../pages/socialsharing/socialsharing";
import {SettingsPage} from "../pages/settings/settings";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TutorialPage;
  usrimg:string = "assets/img/workingtitle.jpg";
  UserGreet:string="Hello";
  pages: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public storage: Storage,
              public loader: Loader) {

    var time = new Date().getHours();
    if (time < 12 && time > 0){this.UserGreet = "Good Morning"}
    else if (time > 12 && time < 17){this.UserGreet = "Good Afternoon"}


    else if (time > 17 && time < 23){this.UserGreet = "Good Evening"}
    this.loader.presentLoading();
    this.initializeApp();

    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = HomePage;
          this.loader.stopLoading();
        } else {
          this.rootPage = TutorialPage;
          this.loader.stopLoading();
        }
      });

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'About Us', component: AboutPage, icon: 'information-circle'},
      {title: 'Rate US', component: '', icon: 'star-half'},
      {title: 'Show Love', component: SocialsharingPage, icon: 'heart'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == 'Rate US') {
      let toast = this.toastCtrl.create({
        message: 'This will goto App store/Play store after deployment',
        duration: 4000,
        position: 'bottom'
      });
      toast.present(toast);
    }else if(page.title == 'Show Love') {
      let modal = this.modalCtrl.create(SocialsharingPage);
      modal.present();
    }else{
      this.nav.setRoot(page.component, {tabIndex: page.index});
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  openSettings(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
}
