import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccountRoutingModule } from "src/app/features/account/account-routing-module";
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [PanelMenuModule, AccountRoutingModule,NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  items: any[] = []
  menuItems: any[] = [];
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.getItems()
  }
  getItems() {
    this.items = [
      {
        label: 'لوحة التحكم',
        icon: '',
        routerLink: "home",
        roles: [''],
        routerLinkActive: 'active',
      },
      {
        label: 'إدارة العقارات',
        icon: '',
        routerLink : "/real-state-management",
        roles: [''],
        items: [
          {
            label: 'الاراضي',
            routerLink: "/real-state-management/lands",
            roles: [],
          },
          {
            label: 'العمارات',
            routerLink: "/real-state-management/builings",
            roles: [],
          },
          {
            label: 'الوحدات السكانية',
            routerLink: "/login",
            roles: [],
          }
        ]
      }
    ];

    this.menuItems = this.filterItemsByRole(this.items);
  }
  onMenuItemClick() {
    // if (this.innerHeight > this.innerWidth) {
    //   this.Display = false
    //   this.DisplayFun.emit(this.Display)
    // }

  }
  filterItemsByRole(items: any[]): any[] {
    return items;
  }
  isActive(menuItem: any): boolean {
    return this.router.isActive(menuItem.routerLink, true);
  }
}
