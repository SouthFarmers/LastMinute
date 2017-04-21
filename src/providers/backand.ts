import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ICategory} from "../model/category";

@Injectable()
export class Backand {
  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: 'de9979af-d49f-4ce2-bfe5-23e5b05f10aa'};
  api_url: string = 'https://api.backand.com';
  app_name: string = 'sampu';

  constructor(public http: Http) {}

  private authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);

    return authHeader;
  }

  public getTodos() {
    return this.http.get('https://api.backand.com/1/query/data/GetSubjects?parameters=%7B%22yearsem%22:%22%5C%22oneone%5C%22%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }


  getSubjects(sem): Observable<ICategory[]>{

    return this.http.get('https://api.backand.com/1/query/data/GetSubjects?parameters=%7B%22yearsem%22:%22%5C%22'+sem+'%5C%22%22%7D', {
      headers: this.authHeader()
    })
      .map((response:Response) => <ICategory[]>
        response.json())
      .catch(this.catchError);
  }

  public getAllQuestionsP(subjectID) {
    return this.http.get(this.api_url + '/1/query/data/GetAllQuestions?parameters=%7B%22subjectid%22:%22'+subjectID+'%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public getChapterQuestionsP(chapter,subject) {
    return this.http.get(this.api_url + '/1/query/data/GetQuestionFromChapter?parameters=%7B%22subject%22:%22'+subject+'%22,%22chapter%22:%22'+chapter+'%22,%22sort%22:%22importance%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public getAnswersP(qid, sort) {
    return this.http.get(this.api_url + '/1/query/data/GetAnswersForQuestion?parameters=%7B%22qid%22:%22'+qid+'%22,%22sort%22:%22'+sort+'%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public updateVotesP(answerid, value) {
    return this.http.get(this.api_url + '/1/query/data/UpdateAnswerUpVotes?parameters=%7B%22answerID%22:%22'+answerid+'%22,%22value%22:%22'+value+'%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public addAnswersP(qid, answer) {
    return this.http.get(this.api_url + '/1/query/data/AddAnswers?parameters=%7B%22qid%22:%22'+qid+'%22,%22answer%22:%22%5C%22'+answer+'%5C%22%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public addQuestionP(question, chapterid,subjectid) {

    return this.http.get(this.api_url + '/1/query/data/AddQuestion?parameters=%7B%22question%22:%22%5C%22'+question+'%5C%22%22,%22chapterid%22:%22'+chapterid+'%22,%22subjectid%22:%22'+subjectid+'%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public uploadAnswerImageP(ansid,ansimage) {

    return this.http.get(this.api_url + '/1/query/data/AddAnswerImage?parameters=%7B%22ansid%22:%22'+ansid+'%22,%22answerimagedata%22:%22%5C%22'+ansimage+'%5C%22%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }

  public uploadQuestionImageP(qid,imagedata) {

    let data = JSON.stringify({
      imagedata: imagedata,
      qid: qid
    });
    return this.http.post(this.api_url + '/1/objects/QuestionImages', data, {headers: this.authHeader()})
      .map(res => res.json())
  }

  public getQuestionImageP(qid) {

    return this.http.get(this.api_url + '/1/query/data/GetQuestionImages?parameters=%7B%22qid%22:%22'+qid+'%22%7D', {
      headers: this.authHeader()
    })
      .map(res => res.json())
  }


  catchError(error:Response){
    return Observable.throw(error.json().error || 'Server error');
  }

}




