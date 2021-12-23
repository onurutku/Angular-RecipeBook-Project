import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage: string;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data['message'];
    this.paramsSubscription = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
}
