import { Component, OnInit } from '@angular/core';
import { Plan, User } from './plan';

@Component({
  selector: 'app-sprintplanning',
  templateUrl: './sprintplanning.component.html',
  styleUrls: ['./sprintplanning.component.scss']
})
export class SprintplanningComponent implements OnInit {

  plans: Plan[] = [
    {
      id: 0,
      subject: "Tema 1",
      user_story_id: [0, 2, 5],
      activity: "Actividad 1",
      assigned: [
        {
          id: 0,
          first_name: "Pedro",
          last_name: "Pérez"
        },
        {
          id: 1,
          first_name: "María",
          last_name: "Grimmaldi"
        }
      ]
    },
    {
      id: 1,
      subject: "Tema 2",
      user_story_id: [1, 3, 4],
      activity: "Actividad 2",
      assigned: [
        {
          id: 1,
          first_name: "María",
          last_name: "Grimmaldi"
        }
      ]
    },
    {
      id: 2,
      subject: "Tema 3",
      user_story_id: [6, 7, 8],
      activity: "Actividad 3",
      assigned: [
        {
          id: 2,
          first_name: "Julio",
          last_name: "Pérez"
        },
        {
          id: 0,
          first_name: "Pedro",
          last_name: "Pérez"
        },
        {
          id: 1,
          first_name: "María",
          last_name: "Grimmaldi"
        }
      ]
    }
  ];


  constructor() { }

  ngOnInit() {
  }

  showUsers(users: User[]) {
    var str = "";
    users.forEach(user => {
      str += user.first_name + " " + user.last_name + ", ";
    });
    return str.substring(0, str.length - 2);
  }

}
