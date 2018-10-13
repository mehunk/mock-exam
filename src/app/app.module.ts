import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { CustomMaterialModule } from './material.module';

import { environment } from '../environments/environment';

import {
  AppComponent,
  CategoryComponent,
  QuestionComponent,
  TagComponent,
  QuestionAddUpdateComponent
} from './components';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryDataService } from './in-memory-data.service';

import { reducers, metaReducers } from './store/reducers';
import { CategoryEffects, TagEffects, QuestionEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    QuestionComponent,
    TagComponent,
    QuestionAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    FlexLayoutModule,
    CustomMaterialModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([CategoryEffects, TagEffects, QuestionEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
