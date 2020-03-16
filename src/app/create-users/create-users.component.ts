import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  user_list = [];
  constructor(private usersServices:UsersService,private router: Router) { }

  ngOnInit() {

    this.usersServices.getAll().subscribe(data=>{
      if (data){
        if (!data.error){
          console.log(data);
          this.user_list = data;
        }
      }
    })
  }

  register(){
    this.router.navigate(['register']);

  }

}
