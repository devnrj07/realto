import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/common/models/user';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { first } from 'rxjs/operators';
import {Countries} from '../../common/countries';
@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {

  
  required: string = 'This field is required.';
  datepicker: MatDatepicker<Date>;
  formErrors: any;
  maxDate: Date;
  minDate: Date;

  countries = Countries;

  name: string;
  dob: Date;
  email;
  avatar;
  country;


  constructor(
    
    private dialogRef: MatDialogRef<EditUserDetailsComponent>,
   @Inject(MAT_DIALOG_DATA)   { name, dob, email, avatar,country}: User,
    private userService: UserDetailsService
  ) {
    let now: Date = new Date();
    this.maxDate = new Date((now.getFullYear() - 18), now.getMonth(), now.getDate());
    this.minDate = new Date((now.getFullYear() - 100), now.getMonth(), now.getDate());
    //update form with existing values
    this.name = name;
    this.dob = dob;
    this.email = email;
    this.country=country;
    this.avatar = avatar;
   }


  ngOnInit() {

    
  }

   save(myForm) {
    
    const updatedUser ={
      name:myForm.value.name,
      dob:myForm.value.dob,
      email:myForm.value.email,
      country:this.country,
      avatar:this.avatar,
      password:"default"
    }

    this.dialogRef.close(updatedUser);
    console.log("updated values ", updatedUser)
    this.userService.updateUser(updatedUser)
      .pipe(first())
      .subscribe(response => {
        console.log("update", response)
            
      }, error => {
        console.log("update ", error)
        //this.dialogRef.close(this.formGroup.value);
      })

  }

  close() {
    this.dialogRef.close('none');
  }

}
