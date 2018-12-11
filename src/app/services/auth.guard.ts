import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers';
import { AuthenticationService } from './authentication.service';
import { Login } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private store: Store<fromRoot.State>,
    private authService: AuthenticationService
  ) {}

  public canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn.pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.store.dispatch(new Login(state.url));
        }
      }),
      first()
    );
  }

  public canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(next, state);
  }
}
