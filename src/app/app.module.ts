import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Backand} from "../providers/backand";
import {CategoryService} from "../providers/category-service";
import {HttpModule} from "@angular/http";
import {TutorialPage} from "../pages/tutorial/tutorial";
import { IonicStorageModule } from '@ionic/storage';
import {ChaptersPage} from "../pages/chapters/chapters";
import {QuestionsPage} from "../pages/questions/questions";
import {AnswersPage} from "../pages/answers/answers";
import {Modalanswer} from "../pages/modalanswer/modalanswer";
import {Modalquestion} from "../pages/modalquestion/modalquestion";
import {Elastic} from "../pages/questions/elastic";
import {Loader} from "../providers/loader";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutorialPage,
    ChaptersPage,
    QuestionsPage,
    AnswersPage,
    Modalanswer,
    Modalquestion,
    Elastic
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'overlay',
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TutorialPage,
    ChaptersPage,
    AnswersPage,
    QuestionsPage,
    Modalanswer,
    Modalquestion
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Backand,
    CategoryService,
    Loader
  ]
})
export class AppModule {}
