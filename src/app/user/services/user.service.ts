import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { GridPagination, User } from '../store/user.reducer';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

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

  public updateUser(id: string | number, body: Partial<User>): Observable<Partial<User>> {
    return this._http.put(`https://reqres.in/api/users/` + id, body) as Observable<Partial<User>>;
  }
}
