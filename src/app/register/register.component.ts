import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserDetailsService } from '../services/user-details.service';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { Countries } from '../common/countries';
import { NotificationService } from '../services/notification.service';
// newuser2@yes.in thisismypassword



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  countries = Countries;
  hide = true;

  color = 'primary';
  diameter = 20;
  width = 20;

  maxDate: Date;
  minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: UserAuthenticationService,
    private userService: UserDetailsService,
    private notificationService: NotificationService
  ) {
    let now: Date = new Date();
    this.maxDate = new Date((now.getFullYear() - 18), now.getMonth(), now.getDate());
    this.minDate = new Date((now.getFullYear() - 100), now.getMonth(), now.getDate());

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['list']);
    }

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      country: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]

    })
  }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerUser(this.registerForm.value)
       .pipe(first())
       .subscribe(data => {
          console.log(data);
          this.notificationService.notify('Registration successful');
          this.router.navigate(['login']);
        },
        error => {
          console.log(error)
          this.notificationService.alert('Registration failed');
          this.loading = false;
          this.reset();
          setTimeout(() => {
            this.notificationService.notify('Please try again');
          }, 2000)
          this.loading = false;
        });

  }

  reset() {
    this.registerForm.reset();
  }


  get fc() { return this.registerForm.controls; }
}
