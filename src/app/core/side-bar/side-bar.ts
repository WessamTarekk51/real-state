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
            routerLink: "/real-state-management/units",
            roles: [],
          }
        ]
      },
      {
        label: 'إدارة العملاء',
        icon: '',
        routerLink : "/customer-management",
        roles: [''],
        items: [
          {
            label: 'العملاء',
            routerLink: "/customer-management/clients",
            roles: [],
          },
          {
            label: 'اضافة عميل جديد',
            routerLink: "/customer-management/clients/create",
            roles: [],
          },
          {
            label: 'سجل المتابعات',
            routerLink: "/customer-management/calls",
            roles: [],
          }
        ]
      },
      {
        label: 'إدارة المبيعات',
        icon: '',
        routerLink : "/sales-management",
        roles: [''],
        items: [
          {
            label: 'العقود',
            routerLink: "/sales-management/contracts",
            roles: [],
          },
          {
            label: 'انشاء عقد جديد',
            routerLink: "/sales-management/contracts/create",
            roles: [],
          }
        ]
      },
      {
        label: 'إدارة المستخدمين ',
        icon: '',
        routerLink : "/user-management",
        roles: [''],
        items: [
          {
            label: 'الأدوار والصلاحيات',
            routerLink: "/user-management/roles",
            roles: [],
          },
          {
            label: 'انشاء دور جديد',
            routerLink: "/user-management/roles/create",
            roles: [],
          },
          {
            label: 'المستخدمين',
            routerLink: "/user-management/users",
            roles: [],
          },
          {
            label: 'انشاء مستخدم جديد',
            routerLink: "/user-management/users/create",
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
