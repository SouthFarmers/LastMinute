import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TutorialPage,
    ChaptersPage,
    QuestionsPage,
    AnswersPage,
    Modalanswer,
    Modalquestion
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
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
    CategoryService
  ]
})
export class AppModule {}
