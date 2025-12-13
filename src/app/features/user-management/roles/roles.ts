import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'src/app/shared/components/button/button';

@Component({
  selector: 'app-roles',
  imports: [Button],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
  constructor(private router: Router) {}
  createRole() {
    this.router.navigate(['/user-management/roles/create']);
  }
}
