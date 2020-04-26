import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar:MatSnackBar, private zone: NgZone) { }



  public notify(message,action='Close',duration=3000){
    this.zone.run(()=>{
      this.snackBar.open(message,action,{duration,
        verticalPosition: 'bottom',
          horizontalPosition:'center',
          panelClass:['success']
      });
    });
  }

  public alert(message,action='Close',duration=3000){
    this.zone.run(()=>{
      this.snackBar.open(message,action,{duration,
        verticalPosition: 'bottom',
        horizontalPosition:'center',
        panelClass:['warn']
      });
    });
  }
}
