import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login.servise';
import {map} from 'rxjs/operators';
import {OpenWindowSingIn} from './open-sing-in';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private openWindowSingIn: OpenWindowSingIn ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // get user
    // this.loginService.user.subscribe( (user) => {
    //   if (user) {
    //     return true;
    //   } else {
    //     this.router.navigate(['']);
    //   }
    //    return false;
    // });
    return this.loginService.user.pipe(map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['']);
        this.openWindowSingIn.open();
        return false;
      }
    }));
  }

}
