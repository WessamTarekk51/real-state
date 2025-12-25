import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core-module';
import { SideBar } from "./core/side-bar/side-bar";
import { TopBar } from "./core/top-bar/top-bar";
import { HttpClientModule } from '@angular/common/http';
import { Loading } from "./shared/components/loading/loading";
import { routeAnimation } from './core/animation/route-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, SideBar, TopBar, HttpClientModule, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimation],

})
export class App {
  title: string;
  getTitle(value: any) {
    this.title = value.pageTitle
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
