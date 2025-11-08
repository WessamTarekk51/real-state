import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core-module';
import { SideBar } from "./core/side-bar/side-bar";
import { TopBar } from "./core/top-bar/top-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, SideBar, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title: string;
  getTitle(value: any) {
    this.title = value.pageTitle
  }
}
