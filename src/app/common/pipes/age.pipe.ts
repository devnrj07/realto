import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'getAge' })
export class AgePipe implements PipeTransform {
  transform(value: Date): string {
    let age;
    const today = new Date();
    const birthDate = new Date(value);
    age = today.getFullYear() - birthDate.getFullYear();
    //adjust according to months 
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;

  }
}
