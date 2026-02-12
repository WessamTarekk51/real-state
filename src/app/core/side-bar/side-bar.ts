import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccountRoutingModule } from "src/app/features/account/account-routing-module";
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CheckToken } from '../services/check-token';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-side-bar',
  imports: [PanelMenuModule, AccountRoutingModule, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  items: any[] = []
  menuItems: any[] = [];
  currentUser$: Observable<LoginUser | null>;
  constructor(private router: Router, private CheckToken: CheckToken) {
    this.currentUser$ = this.CheckToken.currentUser$;
    console.log(this.currentUser$)
  }
  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (!user) return;
      const userPermissions = user.permissionIds; // string[]
      this.getItems(userPermissions);
    });

  }
  getItems(userPermissions : any) {
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
        routerLink: "/real-state-management",
        roles: ['Permissions.Assets.View'],
        items: [
          {
            label: 'الاراضي',
            routerLink: "/real-state-management/lands",
            roles: ['Permissions.Assets.View'],
          },
          {
            label: 'العمارات',
            routerLink: "/real-state-management/builings",
            roles: ['Permissions.Assets.View'],
          },
          {
            label: 'الوحدات السكانية',
            routerLink: "/real-state-management/units",
            roles: ['Permissions.Assets.View'],
          }
        ]
      },
      {
        label: 'إدارة العملاء',
        icon: '',
        routerLink: "/customer-management",
        roles: ['Permissions.Clients.View'],
        items: [
          {
            label: 'العملاء',
            routerLink: "/customer-management/clients",
            roles: ['Permissions.Clients.View'],
          },
          {
            label: 'اضافة عميل جديد',
            routerLink: "/customer-management/clients/create",
            roles: ['Permissions.Clients.Create'],
          },
          {
            label: 'سجل المتابعات',
            routerLink: "/customer-management/calls",
            roles: ['Permissions.Clients.View'],
          }
        ]
      },
      {
        label: 'إدارة المبيعات',
        icon: '',
        routerLink: "/sales-management",
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
        label: 'إدارة المدفوعات',
        icon: '',
        routerLink: "/payments-management",
        roles: [''],
        items: [
          {
            label: 'المدفوعات الواردة',
            routerLink: "/payments-management/incomes",
            roles: [],
          },
          {
            label: 'اضافه مدفوع وارد',
            routerLink: "/payments-management/incomes/create",
            roles: [],
          },
          {
            label: 'المدفوعات الخارجة',
            routerLink: "/payments-management/outcomes",
            roles: [],
          },
          {
            label: 'اضافه مدفوع خارج',
            routerLink: "/payments-management/outcomes/create",
            roles: [],
          },
          {
            label: 'مدفوعات خاصة',
            routerLink: "/payments-management/privateOutcomes",
            roles: [],
          },
          {
            label: 'اضافه مدفوع خاص',
            routerLink: "/payments-management/privateOutcomes/create",
            roles: [],
          },
          {
            label: 'الأقساط',
            routerLink: "/payments-management/installments",
            roles: [],
          },
          {
            label: 'اضافه قسط',
            routerLink: "/payments-management/installments/create",
            roles: [],
          },

        ]
      },
      {
        label: 'إدارة المستخدمين ',
        icon: '',
        routerLink: "/user-management",
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
      },
      {
        label: 'إدارة العمال والفنيين',
        icon: '',
        routerLink: "/worker-management",
        roles: [''],
        items: [
          {
            label: 'العمال',
            routerLink: "/worker-management/workers",
            roles: [],
          },
          {
            label: 'إضافة عامل جديد',
            routerLink: "/worker-management/workers/create",
            roles: [],
          }
        ]
      }
    ];

    this.menuItems = this.filterItemsByPermissions(this.items,userPermissions);
  }
  onMenuItemClick() {
    // if (this.innerHeight > this.innerWidth) {
    //   this.Display = false
    //   this.DisplayFun.emit(this.Display)
    // }

  }

  isActive(menuItem: any): boolean {
    return this.router.isActive(menuItem.routerLink, true);
  }
  logOut() {
    this.CheckToken.logout()
  }
  filterItemsByPermissions(items: any[], userPermissions: string[]): any[] {
    return items
      .filter(item => {
        // لو مفيش permissions محددة → يظهر لكل المستخدمين
        if (!item.roles || item.roles.length === 0) return true;

        // يظهر بس لو عنده أي permission مطابقة
        return item.roles.some((p:string) => userPermissions.includes(p));
      })
      .map(item => {
        const newItem = { ...item };
        // فلترة العناصر الفرعية recursively
        if (item.items && item.items.length) {
          newItem.items = this.filterItemsByPermissions(item.items, userPermissions);
        }
        return newItem;
      });
  }

}
