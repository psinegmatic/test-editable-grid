import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridPagination } from '../models/grid.model';
import { User, UserReq } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _api = 'https://reqres.in/api/users';

  constructor(private _http: HttpClient) { }

  public getUsers(params?: GridPagination): Observable<UserReq> {
    let options = {};
    if (params) {
      options = {params: new HttpParams()
        .set('page', params.page.toString())
        .set('per_page', params.per_page.toString())};
    }
      return this._http.get(this._api, options) as Observable<UserReq>;
  }

  public updateUser(id: string | number, body: Partial<User>): Observable<Partial<User>> {
    return this._http.put(this._api + id, body) as Observable<Partial<User>>;
  }
}
