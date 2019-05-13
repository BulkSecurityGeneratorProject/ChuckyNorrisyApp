import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { Fact } from 'app/fact/fact.model';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  facts: any[];
  facts_fav: any[];
  modalRef: NgbModalRef;
  numFacts: number;
  loading: boolean;
  Object = Object;
  showFavorites: boolean;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.facts = [];
    this.facts_fav = [];
    this.getFavorites();
    this.numFacts = 10;
    this.refresh();
    this.showFavorites = true;
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  favorite(event) {
    const id = event.currentTarget.id;

    // sanity check
    if (this.facts_fav[id] != null) {
      return;
    }

    // todo dim - api call to java server, rest api catches, pushes to controller, pushes to db.
    // this._apiService.saveFavoriteFact(this.facts[id]);

    // todo dim - on return success push fact to to favorite list
    this.facts[id].favorited = true;
    this.facts_fav[id] = this.facts[id];
  }

  refresh() {
    this.loading = true;

    this._apiService.getFact(this.numFacts).subscribe(data => {
      let iter = data.length;

      this.facts = [];

      // debugger;
      while (iter--) {
        this.facts[data[iter].id] = data[iter];

        // check if already favorited, mark this as favorited as well
        if (this.facts_fav[data[iter].id] != null) {
          this.facts[data[iter].id].favorited = true;
        }
      }

      this.loading = false;
    });
  }

  getFavorites() {
    this._apiService.getFavoriteFacts().subscribe(data => {
      if (data.length < 1) {
        return [];
      }

      // todo dim - parse data and pass into favorite list
      // parsing...
      this.facts_fav = data;
    });
  }
}
