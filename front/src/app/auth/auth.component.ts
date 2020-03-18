import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: string;
  userPass: string;

  constructor(private api: WebService, private router: Router) { }

  ngOnInit(): void {
  }
  auth() {
    const user = {
      login: this.login,
      password: this.userPass
    };
    this.api.authUser(user).subscribe(res => {
      if (!res.success) {
       alert('Не правильні дані')
      }
      else {
        this.router.navigate(['/account'])
        this.api.storeUser(res.token, res.users);
      }
    });
  }
}
