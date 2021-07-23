import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      this.accountService.setCurrentUser(user);
    } else {
      this.accountService.setCurrentUser(null);
    }
  }
}
