import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
// import { of } from 'rxjs/observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './firebase/user.service';
import { switchMap } from 'rxjs/Operators';
import { AppUser } from './models/app-user';


@Injectable()
export class AuthService {

  user$:Observable<firebase.User>;

  constructor(
    private userService:UserService,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
   }

  
  login() {
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .pipe(switchMap(user => {
      if(user)
      return this.userService.get(user.uid);

      return of();
    }))
  }
}
