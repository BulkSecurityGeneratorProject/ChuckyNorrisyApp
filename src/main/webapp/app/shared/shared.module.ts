import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChuckNorrisAppSharedLibsModule, ChuckNorrisAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ChuckNorrisAppSharedLibsModule, ChuckNorrisAppSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ChuckNorrisAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChuckNorrisAppSharedModule {
  static forRoot() {
    return {
      ngModule: ChuckNorrisAppSharedModule
    };
  }
}
