import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  loading: Boolean = false;
  submitted :Boolean= false;
  returnUrl: String;

  color = 'warn'
  diameter = 30;
  width = 5;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserAuthenticationService,
    private notificationService: NotificationService
    ) {

      // redirect to list if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['list']);
    }
  }

  

  ngOnInit() {
  
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]]
    });
  }

  //validate form, display spinner, handle error
  onSubmit(){
      this.submitted = true;

     
       
      //check form validity
      if(this.loginForm.invalid){
        this.notificationService.alert('Invalid credentials')
        return;
      }

      this.loading = true;
      this.authenticationService.login(this.fc.email.value, this.fc.password.value)
      .pipe(first())
      .subscribe(data =>{
        console.log(data);
          //display success
          console.log(data)
          this.notificationService.notify('user logged in');
          this.router.navigate(['list']);
      },
      error =>{
        //alert error
        console.log(error);
        this.notificationService.alert('Oops Something went wrong!')
        this.loading = false;
      })
  }



  get fc(){
    return this.loginForm.controls;
  }
}
