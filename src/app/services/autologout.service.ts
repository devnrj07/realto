import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';

const AUTO_LOGOUT_TIME = 1 // in Minutes
const CHECK_INTERVAL = 1000 // in ms
const STORE_KEY = 'lastActivity';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  

  constructor(
    private authService: UserAuthenticationService,
    private router: Router,
    private ngZone: NgZone

  ) {

    //this.check();
    this.initListener();
    this.initTimer();
  }

  get lastActivity() {
    return parseInt(JSON.parse(localStorage.getItem(STORE_KEY)));
  }
  set lastActivity(value) {
    localStorage.setItem(STORE_KEY,JSON.stringify(value));
  }


  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('mouseover', () => this.reset());
      document.body.addEventListener('mouseout', () => this.reset());
      document.body.addEventListener('keydown', () => this.reset());
      document.body.addEventListener('keyup', () => this.reset());
      document.body.addEventListener('keypress', () => this.reset());
    });
  }

  initTimer() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVAL)
    })
  }


  reset() {
    this.lastActivity = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastActivity + AUTO_LOGOUT_TIME * 60 * 1000;
    const timeDifference = timeleft - now;
    const isTimedOut = timeDifference < 0;

    this.ngZone.run(() => {
      let urlInfo=this.router.url;
      if (!this.authService.currentUserValue) {
                
      }
      else if (isTimedOut) {
        console.log('User logged out');
        this.router.navigateByUrl('/login');

      }
      this.authService.logout();
    })
  }
}
 /* Thanks to sean for this awesome hack!

 https://medium.com/@sean.nicholas/how-we-implemented-auto-logout-client-side-c060b1eb311c
https://stackoverflow.com/questions/45911893/automatic-logout-in-angular-2-after-few-minutes */
