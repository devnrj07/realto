import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { first, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  currentUser;
  users = [];
  loading = false;
  color = 'primary';
  diameter = 20;
  width = 20;
  constructor(
    private router: Router,
    private authenticationService: UserAuthenticationService,
    private userService: UserDetailsService,
    private notification: NotificationService
  ) {

    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.loading = true;
    return this.userService.getAllUsers()
      .pipe(first())
      .subscribe(users => {
        console.log("data", users);
        this.users = users
        this.loading = false;
        this.notification.notify('user list loaded')
      }, error => {
        console.error(error);
        this.loading = false;
      });
  }

  exit() {
    this.notification.alert('user logged out')
    this.authenticationService.logout();
    this.router.navigate(['login'])

  }
}
