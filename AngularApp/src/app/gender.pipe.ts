import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Gender' })
export class GenderPipe implements PipeTransform {
  transform(gender: number) {
    return gender == 0 ? 'Male' : 'Female';
  }
}