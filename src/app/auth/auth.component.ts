import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  switchMode() {
    this.loginMode = !this.loginMode;
  }
}
