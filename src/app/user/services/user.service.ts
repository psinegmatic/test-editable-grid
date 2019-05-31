import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { GridPagination } from '../user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public getUsers(params?: GridPagination) {
    let options = {};
    if (params) {
      options = {params: new HttpParams()
        .set('page', params.page.toString())
        .set('per_page', params.per_page.toString())};
    }
      return this._http.get(`https://reqres.in/api/users`, options);
  }
}
