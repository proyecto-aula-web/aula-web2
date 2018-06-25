import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEnvent
} from '@angular/router';


@Component({
  selector: 'au-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  route1: {id: string, idTheme: string};

  constructor(
    private _Router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.currentTheme();
    this._Router.events.forEach((event: NavigationEnvent) => {
      if (event instanceof NavigationStart) {
        this.currentTheme();
        // this.ListToShow(event.url);
      } else if (event instanceof NavigationEnd) {
        this.currentTheme();
        // this.ListToShow(event.url);
      }
    });
  }


  currentTheme() {
    const id = this.route.snapshot.paramMap.get('id');
    const idTheme = this.route.snapshot.paramMap.get('idTheme');
    this.route1 = {
      id: id,
      idTheme: idTheme
    };
  }

}
