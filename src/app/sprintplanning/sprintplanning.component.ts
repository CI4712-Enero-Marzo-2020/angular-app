import { Component, OnInit } from '@angular/core';
import { Plan } from './plan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from '../productbacklog/story';
import { AuthService } from '../services/users/auth.service';

@Component({
  selector: 'app-sprintplanning',
  templateUrl: './sprintplanning.component.html',
  styleUrls: ['./sprintplanning.component.scss']
})
export class SprintplanningComponent implements OnInit {

  plans: Plan[] = [
    {
      id: 0,
      planning_id: 0,
      subject: "Tema 1",
      user_story_id: "0, 2, 5",
      activity: "Actividad 1",
      assigned: "Pedro Pérez, María Grimaldi"
    },
    {
      id: 1,
      planning_id: 0,
      subject: "Tema 2",
      user_story_id: "1, 3, 4",
      activity: "Actividad 2",
      assigned: "María Grimaldi"
    },
    {
      id: 2,
      planning_id: 0,
      subject: "Tema 3",
      user_story_id: "6, 7, 8",
      activity: "Actividad 3",
      assigned: "Pedro Pérez, María Grimaldi, Julio Pérez"
    }
  ];
  addEditPlanForm: FormGroup;
  addMode = true;
  plan: Plan;
  searchword : string = "";

  sprint: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    
  }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = ""
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditPlanForm = this.formBuilder.group({
      subject: ["", Validators.required],
      user_story_id: ["", Validators.required],
      activity: ["", Validators.required],
      assigned: ["", Validators.required]
    });
  }

  initializeEditForm(plan: Plan) {
    this.plan = plan;
    this.addMode = false;
    this.addEditPlanForm = this.formBuilder.group({
      subject: [this.plan.subject, Validators.required],
      user_story_id: [this.plan.user_story_id, Validators.required],
      activity: [this.plan.activity, Validators.required],
      assigned: [this.plan.assigned, Validators.required]
    });
  }

  initializeDeleteForm(plan: Plan) {
    this.plan = plan;
  }

  async createPlan() {
    const formData = new FormData();
    formData.append('planning_id', "0");
    formData.append('subject', this.addEditPlanForm.get('subject').value);
    formData.append('user_story_id', this.addEditPlanForm.get('user_story_id').value);
    formData.append('activity', this.addEditPlanForm.get('activity').value);
    formData.append('assigned', this.addEditPlanForm.get('assigned').value);
    console.log(formData.get('subject'));
    console.log(formData.get('user_story_id'));
    console.log(formData.get('activity'));
    console.log(formData.get('assigned'));
  }

  async editPlan() {
    const formData = new FormData();
    formData.append('id', this.plan.id.toString());
    formData.append('planning_id', "0");
    formData.append('subject', this.addEditPlanForm.get('subject').value);
    formData.append('user_story_id', this.addEditPlanForm.get('user_story_id').value);
    formData.append('activity', this.addEditPlanForm.get('activity').value);
    formData.append('assigned', this.addEditPlanForm.get('assigned').value);
    console.log(formData.get('id'));
    console.log(formData.get('subject'));
    console.log(formData.get('user_story_id'));
    console.log(formData.get('activity'));
    console.log(formData.get('assigned'));
  }

  async removePlan() {
  }

  filterPlans(id: string) {
    if (id == "") return this.plans;
    var plans = [];
    this.plans.forEach(plan => {
      if (plan.id.toString().includes(id)) {
        plans.push(plan);
      }
    });
    return plans;
  }

}
