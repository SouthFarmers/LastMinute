import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../model/category';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {

  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: 'de9979af-d49f-4ce2-bfe5-23e5b05f10aa'};
  api_url: string = 'https://api.backand.com';
  app_name: string = 'sampu';

  constructor(public http: Http) {

  }

  private authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);

    return authHeader;
  }

  getCategories(): Observable<ICategory[]>{

    return this.http.get('https://api.backand.com/1/query/data/GetSubjects?parameters=%7B%22yearsem%22:%22%5C%22oneone%5C%22%22%7D', {
      headers: this.authHeader()
  })
            .map((response:Response) => <ICategory[]>
              response.json())
             .catch(this.catchError);
  }

  catchError(error:Response){
    return Observable.throw(error.json().error || 'Server error');
  }

}
