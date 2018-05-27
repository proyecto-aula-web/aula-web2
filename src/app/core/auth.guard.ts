import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators/take';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

import { UserInterface } from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user
      .pipe(take(1), map(user => !!user), tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/signin']);
        } else {
          console.log('access granted!');
        }
      }));


  }
}
