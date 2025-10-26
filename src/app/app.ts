import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core-module';
import { SideBar } from "./core/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'project-arc';
}
