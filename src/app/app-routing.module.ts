import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CategoryComponent,
  QuestionComponent,
  TagComponent,
  QuestionAddUpdateComponent
} from './components';

const appRoutes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'tags', component: TagComponent },
  { path: 'question/add', component: QuestionAddUpdateComponent },
  { path: '',   redirectTo: '/categories', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
