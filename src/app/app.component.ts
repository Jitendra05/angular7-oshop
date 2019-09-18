import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './firebase/user.service';
import { AppUser } from './models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 constructor(
   private userService:UserService,
   private router:Router,
    private auth:AuthService) {
   this.auth.user$.subscribe((user)=>{
      if(!user) return;
      this.userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
   });
 }
}
