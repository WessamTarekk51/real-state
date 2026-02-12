import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core-module';
import { SideBar } from "./core/side-bar/side-bar";
import { TopBar } from "./core/top-bar/top-bar";
import { HttpClientModule } from '@angular/common/http';
import { Loading } from "./shared/components/loading/loading";
import { routeAnimation } from './core/animation/route-animations';
import { Observable } from 'rxjs';
import { CheckToken } from './core/services/check-token';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, CoreModule, SideBar, TopBar, HttpClientModule, Loading, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimation],

})
export class App {
  title: string;
  Login$: Observable<boolean>;

  constructor(private CheckToken: CheckToken) {
    this.Login$ = this.CheckToken.Login$;
  }
  getTitle(value: any) {
    this.title = value.pageTitle
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
