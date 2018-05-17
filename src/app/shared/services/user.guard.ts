import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login.servise';
import {map} from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.user.pipe(map(user => {
      if (user) {
        this.router.navigate(['']);
        return false;
      } else {
        return true;
      }
    }));
  }

}
