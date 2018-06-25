import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEnvent } from '@angular/router';
import { AuthService } from './core/auth.service';
import { UserService } from './services/user.service';
// import {MiServici}
@Component({
  selector: 'au-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Aula';

  public homeRoute = '/home';
  public courseRoute = '/course';
  public ComponentList: string | undefined = undefined;

  public isLogin: boolean;
  public username: string;
  public email: string;
  public fotoUsuario: string;
  mobileQuery: MediaQueryList;

  fillerNav = Array(15)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(15)
    .fill(0)
    .map(
      () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    );

  private _mobileQueryListener: () => void;

  screenWidth: number;
  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  shouldRun = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private _Router: Router,
    private _AuthService: AuthService,
    private _UserService: UserService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this._AuthService.getAuth().subscribe(auth => {
      console.log('Auth', auth);
      if (auth) {
        this.isLogin = true;

        this.username = auth.displayName;
        this.email = auth.email;
        this.fotoUsuario = auth.photoURL ? auth.photoURL : null;

        this._UserService.getUser(auth.uid).subscribe((userData) => {
          console.log('del appComponent userData', userData);
          this._Router.navigate(['/home']);
        });

      } else {
        this.isLogin = false;
        this._Router.navigate(['/signin']);
      }

      const url = this._Router.url;
      this.ListToShow(url);

      this._Router.events.forEach((event: NavigationEnvent) => {
        if (event instanceof NavigationStart) {
          this.ListToShow(event.url);
        } else if (event instanceof NavigationEnd) {
          this.ListToShow(event.url);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onClickLogout() {
    this._AuthService.signOut();
  }

  private ListToShow(url: string) {
    const h = url.indexOf(this.homeRoute);
    const c = url.indexOf(this.courseRoute);

    if (h !== -1) {
      this.ComponentList = this.homeRoute;
    } else if (c !== -1) {
      this.ComponentList = this.courseRoute;
    } else {
      this.ComponentList = undefined;
    }
  }
}
