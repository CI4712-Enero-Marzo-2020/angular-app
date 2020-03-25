import { Component, OnInit } from '@angular/core';
import { Plan } from './plan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from '../productbacklog/story';
import { AuthService } from '../services/users/auth.service';
import { SprintplanningService } from '../services/meetings/sprintplanning/sprintplanning.service';
import { ActivatedRoute } from '@angular/router';

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
      subject: 'Tema 1',
      user_story_id: '0, 2, 5',
      activity: 'Actividad 1',
      assigned: 'Pedro Pérez, María Grimaldi'
    },
    {
      id: 1,
      planning_id: 0,
      subject: 'Tema 2',
      user_story_id: '1, 3, 4',
      activity: 'Actividad 2',
      assigned: 'María Grimaldi'
    },
    {
      id: 2,
      planning_id: 0,
      subject: 'Tema 3',
      user_story_id: '6, 7, 8',
      activity: 'Actividad 3',
      assigned: 'Pedro Pérez, María Grimaldi, Julio Pérez'
    }
  ];
  addEditPlanForm: FormGroup;
  addMode = true;
  plan: Plan;
  searchword: string = '';
  planningId: any;
  sprint: any;
  sprint_id: any;

  constructor(
    private planningService: SprintplanningService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.sprint_id = this.route.snapshot.params.id;
    }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    this.plans = [];
    this.getAllResults();
  }

  async getAllResults() {
    this.planningService.getPlanning(this.sprint_id).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.plans = response.results;
        this.planningId = response.planning.id;
      }
      console.log(response);
    });
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditPlanForm = this.formBuilder.group({
      subject: ['', Validators.required],
      user_story_id: ['', Validators.required],
      activity: ['', Validators.required],
      assigned: ['', Validators.required]
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
    formData.append('planning_id', this.planningId);
    formData.append('subject', this.addEditPlanForm.get('subject').value);
    formData.append('user_story_id', this.addEditPlanForm.get('user_story_id').value);
    formData.append('activity', this.addEditPlanForm.get('activity').value);
    formData.append('assigned', this.addEditPlanForm.get('assigned').value);
    const newPlan: any = await this.planningService.addPlan(this.planningId, formData);
    if (newPlan && newPlan.server !== 'ERROR') {
      this.plans.push(newPlan);
    }
  }

  async editPlan() {
    const index = this.findIndexPlan();
    const formData = new FormData();
    formData.append('id', this.plan.id.toString());
    formData.append('planning_id', this.planningId);
    formData.append('subject', this.addEditPlanForm.get('subject').value);
    formData.append('user_story_id', this.addEditPlanForm.get('user_story_id').value);
    formData.append('activity', this.addEditPlanForm.get('activity').value);
    formData.append('assigned', this.addEditPlanForm.get('assigned').value);
    this.planningService.editPlan(this.plan.id, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.plans = [...this.plans.slice(0, index), response, ...this.plans.slice(index + 1, this.plans.length)];
      }
    });
  }

  async removePlan() {
    const i = this.findIndexPlan();
    await this.planningService.deletePlan(this.plan.id);
    this.plans = [...this.plans.slice(0, i), ...this.plans.slice(i + 1, this.plans.length)];

  }

  filterPlans(id: string) {
    if (id === '') { return this.plans; }
    const plans = [];
    this.plans.forEach(plan => {
      if (plan.id.toString().includes(id)) {
        plans.push(plan);
      }
    });
    return plans;
  }

  findIndexPlan() {
    const getProjectIndex = (element) => element.id === this.plan.id;
    const index = this.plans.findIndex(getProjectIndex);
    return index;
  }
}
