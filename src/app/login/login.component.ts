import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

//Users service
import {AuthService} from '../services/users/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    console.log(this.username);
    this.authService.login(this.username, this.password).subscribe(data => {
      if (data) {
        if (!data.error) {
          console.log(data)
          sessionStorage.setItem('currentUser', JSON.stringify({ access_token: data.access_token,
                                                                refresh_token: data.refresh_token,
                                                                userId: data.userId}));
          localStorage.setItem('currentUser', JSON.stringify({ access_token: data.access_token,
            refresh_token: data.refresh_token,
            userId: data.userId}));
            this.router.navigate(['']);
          this.router.navigate(['']);
        } else {
          console.log('error')
        }
      }
    })
  }

  limpiarCampos() {
    this.username = '';
    this.password = '';
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogoutComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {
    this.logout();
    this.router.navigate([''])
  }

}
