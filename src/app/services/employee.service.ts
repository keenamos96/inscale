import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as dataJSON from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  data: any = dataJSON;
  constructor(private http: HttpClient) { }

  async getEmployee(): Promise<any> {
    try {
      const link = 'https://api.github.com/gists/354fb07f27f3c145b78d7a5cc1f0da0b';
      const result = this.http.get(link).pipe(
        map((data: any) => {
          if (data.files && data.files['data.json']) {
            const json = JSON.parse(data.files['data.json'].content);
            json.forEach((el: any) => {
              el.full_name = el.firstname.concat(' ', el.lastname);
              el.date_joined = new Date(el.dateJoined);
            });
            return json;
          } else {
            return [];
          }
        })
      );
      return await result.toPromise();
    } catch (err) {
      const json = this.data.default;
      json.forEach((el: any) => {
        el.full_name = el.firstname.concat(' ', el.lastname);
        el.date_joined = new Date(el.dateJoined);
      });
      return json;
    }
  }

}
