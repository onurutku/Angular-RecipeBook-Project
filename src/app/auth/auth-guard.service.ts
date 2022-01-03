import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // const statement = this.authService.user.pipe(
    //   map((user) => {
    //     return !!user;
    //   })
    // );
    // if (statement) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth']);
    // }
    return this.authService.user.pipe(
      map((user) => {
        //değeri değiştirmeden true value'yu gerçek true false value'yu gerçek false'a çeviriyormuş.:S
        // return !!user;
        if (!!user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
