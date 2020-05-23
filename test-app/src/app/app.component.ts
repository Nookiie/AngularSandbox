import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/assets/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cinema-app';
  currentUser: User;
  hasLoggedIn: boolean;
  isCurrentUserAdmin: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.hasLoggedIn = response);

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser) {
      this.hasLoggedIn = true;
      if (this.currentUser.isAdmin) {
        this.isCurrentUserAdmin = true;
      }
      else {
        this.isCurrentUserAdmin = false;
      }
    }
    else {
      this.hasLoggedIn = false;
    }


  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogoutClick(): void {
    this.authService.logout();

    this.hasLoggedIn = false;
    this.isCurrentUserAdmin = false;

    this.router.navigate(['login-form']);
  }
}
