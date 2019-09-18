import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth:AuthService) { }

  canActivate() : Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(user => user.isAdmin));
  }
}
