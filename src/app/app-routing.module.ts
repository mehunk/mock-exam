import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CategoryComponent,
  QuestionAddUpdateComponent,
  MyQuestionsComponent,
  TagComponent,
  DashboardComponent,
  AdminComponent,
  AdminQuestionsComponent
} from './components';

import { AuthGuard } from './services';

const appRoutes: Routes = [
  { path: 'question/add', component: QuestionAddUpdateComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'questions', component: MyQuestionsComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'categories', component: CategoryComponent },
      { path: 'questions', component: AdminQuestionsComponent },
      { path: 'tags', component: TagComponent },
    ]
  }
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
