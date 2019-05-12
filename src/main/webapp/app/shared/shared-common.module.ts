import { NgModule } from '@angular/core';

import { ChuckNorrisAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ChuckNorrisAppSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ChuckNorrisAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ChuckNorrisAppSharedCommonModule {}
