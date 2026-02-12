import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/shared/models/user/user';
import { CheckToken } from '../services/check-token';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [AsyncPipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar {
  @Input() title: string;
  currentUser$: Observable<LoginUser | null>;
  user: LoginUser
  constructor(private CheckToken: CheckToken) {
    this.currentUser$ = this.CheckToken.currentUser$;
    console.log(this.currentUser$)
  }

  getInitials(fullName: string): string {
  if (!fullName) return '';
  const words = fullName.trim().split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
}

}
