import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/users/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  role:string;
  first_name:string;
  last_name:string;


  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  register(){
    console.log(this.username);
    this.authService.register(this.username,this.first_name,this.last_name,this.role,this.password).subscribe(data=>{
      if (data){
        if (!data.error){
          this.router.navigate(['/create-users']);
        }
        else{
          console.log('error')
        }
      }
    })
  }

  limpiarCampos(){
    this.username = '';
    this.password = '';
  }

}
