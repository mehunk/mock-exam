import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatChipsModule,
  MatButtonModule
} from '@angular/material';

// import {PlatformModule} from '@angular/cdk/platform';
// import {ObserversModule} from '@angular/cdk/observers';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class CustomMaterialModule {}