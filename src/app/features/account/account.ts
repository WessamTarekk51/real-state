import { Component } from '@angular/core';
import { Login } from "./login/login";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [Login],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class Account {

}
