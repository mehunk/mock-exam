import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

import { CustomMaterialModule } from './material.module';

import { environment } from '../environments/environment';

import {
  AppComponent,
  CategoryComponent,
  QuestionComponent,
  QuestionAddUpdateComponent,
  MyQuestionsComponent,
  TagComponent,
  DashboardComponent,
  LoginComponent,
  AdminComponent,
  AdminQuestionsComponent
} from './components';

import { AppRoutingModule } from './app-routing.module';

import { reducers, metaReducers } from './store/reducers';
import { CategoryEffects, TagEffects, QuestionEffects, AuthEffects } from './store/effects';
import { AuthenticationService } from './services';

// 配置 Firebase Auth
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    QuestionComponent,
    QuestionAddUpdateComponent,
    MyQuestionsComponent,
    TagComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    AdminQuestionsComponent
  ],
  entryComponents: [
    LoginComponent
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
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      CategoryEffects,
      TagEffects,
      QuestionEffects,
      AuthEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase), // 引入 AngularFire 模块，并配置连接参数
    AngularFireDatabaseModule, // 引入 AngularFireDatabase 模块
    AngularFireAuthModule, // 引入 AngularFireAuth 模块
    FirebaseUIModule.forRoot(firebaseUiAuthConfig), // 引入 Firebase Auth
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
