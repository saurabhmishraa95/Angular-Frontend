import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription;
  isUserAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((status) => {
        this.isUserAuthenticated = status;
      });
  }
  onLogout() {
    this.authService.logout();
  }
}
