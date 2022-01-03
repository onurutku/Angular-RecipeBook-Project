import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'course project';
  kabak: Boolean = true;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    // setTimeout(() => {
    //   this.authService.logout();
    // }, 360);
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
