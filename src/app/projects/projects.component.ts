import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/users/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

// TODO: probar cada funcionalidad: GET, PUT, PATCH, DELETE
// TODO: agregar errores de validacion en formularios
// TODO: hacer un solo submit y un solo form para editar y agregar
// TODO: cambiar el json a formdata
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  selectedProject: any;
  addProjectForm: FormGroup;
  editProjectForm: FormGroup;
  id: string;
  projectsDuplicate: any[];
  userID: any;

  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
    // this.projects.push({description: 'Proyecto de SOPIII', id: 1});
    this.getAllProjects();
    if (authService.getCurrentUser()) {
      this.userID = authService.getCurrentUser().userId;
    }
  }


  ngOnInit() {
    this.addProjectForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
    this.editProjectForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }


  selectProject(index: number, action?: string) {
    this.selectedProject = this.projects[index];
    if (action === 'edit') {
      this.editProjectForm.setValue({
        description: this.selectedProject.description
      });
      console.log(this.editProjectForm);
    }
  }

  async getAllProjects() {

    this.projectsService.getAll().then((projects) => {
      if ( projects && projects.server !== 'NO_CONTENT') {
        this.projects = projects;
      }
    });
  }

  async createProject() {
    const formData = new FormData();
    formData.append('description', this.addProjectForm.get('description').value);
    formData.append('user_id', this.userID);
    const newProject = await this.projectsService.create(formData);
    this.projects.push(newProject);
  }

  async editProject() {
    const formData = new FormData();
    formData.append('description', this.editProjectForm.get('description').value);
    formData.append('user_id', this.userID);
    const editedProject = await this.projectsService.edit(this.selectedProject, formData);
    const index = this.findIndexProject();
    this.projects = [...this.projects.slice(0, index), editedProject, ...this.projects.slice(index + 1, this.projects.length)];
  }

  async pauseProject() {
    const editedProject = await this.projectsService.changeStatus(this.selectedProject, 'pause');
    const index = this.findIndexProject();
    this.projects = [...this.projects.slice(0, index), editedProject, ...this.projects.slice(index + 1, this.projects.length)];
  }

  async activateProject() {
    const editedProject = await this.projectsService.changeStatus(this.selectedProject, 'activate');
    const index = this.findIndexProject();
    this.projects = [...this.projects.slice(0, index), editedProject, ...this.projects.slice(index + 1, this.projects.length)];
  }
  async removeProject() {
    const index = this.findIndexProject();
    await this.projectsService.delete(this.selectedProject);
    this.projects = [...this.projects.slice(0, index), ...this.projects.slice(index + 1, this.projects.length)];

  }

  findIndexProject() {
    const getProjectIndex = (element) => element.id === this.selectedProject.id;
    const index = this.projects.findIndex(getProjectIndex);
    return index;
  }


  Search() {

    this.projectsDuplicate = [...this.projects.map(element => JSON.parse(JSON.stringify(element)))];

    if (this.id && this.id.length > 0) {
      this.projects = this.projects.filter(res => {
        return res.id === +this.id;
      });
    } else {
      this.projects = this.projectsDuplicate;
    }
  }

  resetProjectsList() {
    if (this.id.length === 0) {
      this.projects = [...this.projectsDuplicate.map(element => JSON.parse(JSON.stringify(element)))];
    }
  }



}
