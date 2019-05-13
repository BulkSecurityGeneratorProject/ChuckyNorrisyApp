import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChuckNorrisAppSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';

@NgModule({
  imports: [ChuckNorrisAppSharedModule, RouterModule.forChild([HOME_ROUTE]), HttpClientModule],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService]
})
export class ChuckNorrisAppHomeModule {}
