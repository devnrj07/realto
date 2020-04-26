import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditUserDetailsComponent } from '../edit-user-details/edit-user-details.component';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() name;
  @Input() dob;
  @Input() email;
  @Input() avatar;
  @Input() country;
 
  constructor(private matDialog: MatDialog, private notification: NotificationService) { }

  ngOnInit() {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: this.name,
      dob: this.dob,
      email: this.email,
      avatar: this.avatar,
      country:this.country,
      
    }
    console.log('detais :', dialogConfig.data);
    const outputRef = this.matDialog.open(EditUserDetailsComponent, dialogConfig)


 
    outputRef.afterClosed()
      .pipe(first())
      .subscribe(
        val => {
        console.log("val", val)
         if(val !== 'none' || val !== 'undefined'){
          this.name = val.name;
          this.dob = val.dob;
          this.email = val.email;
          this.country = val.country;
          this.notification.notify('user details updated!')
         }
         
        },err =>{
          console.log(err)
          this.notification.notify('failed to updated cards')
        });
      

  }

  display(){
    this.notification.alert('only admin can delete items');
  }

}
