import {MediaMatcher} from '@angular/cdk/layout';
import {Component, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { AuthService } from './core/auth.service';
// import {MiServici}
@Component({
  selector: 'au-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Aula';

  public isLogin: boolean;
  public username: string;
  public email: string;
  public fotoUsuario: string;
  mobileQuery: MediaQueryList;

  fillerNav = Array(15).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(15).fill(0).map(() =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  screenWidth: number;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.screenWidth = window.innerWidth;
  window.onresize = () => {
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;
  };
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.username = auth.displayName;
        this.email = auth.email;
        if (auth.photoURL) {
          this.fotoUsuario = auth.photoURL;
        } else {
          this.fotoUsuario = null;
        }
      } else {
        this.isLogin = false;
      }

    });


  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  shouldRun = true;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

   onClickLogout() {
    this.authService.signOut();
  }


}