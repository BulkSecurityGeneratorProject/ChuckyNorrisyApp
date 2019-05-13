import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class ApiService {
  private factURL = 'https://api.chucknorris.io/jokes/random';
  private REQ_LIMIT = 50;

  constructor(private httpclient: HttpClient, private $localStorage: LocalStorageService) {}

  getFact(num): Observable<any> {
    const responces = [];

    if (num > this.REQ_LIMIT || num < 0) {
      num = 10;
    }

    while (num--) {
      responces.push(this.httpclient.get(this.factURL));
    }

    return forkJoin(responces);
  }

  saveFavoriteFact(fact): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.store(fact.id, fact.value);
      observer.complete();
    });
  }

  getFavoriteFacts(): Observable<any> {
    return new Observable(observer => {
      // todo dim - pull from local storage DB - all favorited quotes for this user
      // this.$localStorage.retrieve();

      observer.complete();
    });
  }
}
