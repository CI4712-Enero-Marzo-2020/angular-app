import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

// TODO: probar cada funcionalidad: GET, PUT, PATCH, DELETE
// TODO: agregar errores de validacion en formularios
// TODO: hacer un solo submit y un solo form para editar y agregar
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  selectedProject: any;
  newProject: any;
  projectForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder
    ) {
    this.projects.push({description: 'Proyecto de SOPIII', id: 1});
  }

  selectProject(index: number) {
    this.selectProject = this.projects[index];
  }

  async getAllProjects() {
    this.projects = await this.projectsService.getAll();
  }

  async createProject() {
    this.newProject = await this.projectsService.create({description: 'project', user_id: 1});
  }

  async editProject() {
    this.selectedProject = await this.projectsService.create(this.selectedProject);
  }

  async pauseProject() {
    this.selectedProject = await this.projectsService.changeStatus(this.selectedProject, 'pause');
  }

  async activateProject() {
    this.selectedProject = await this.projectsService.changeStatus(this.selectedProject, 'activate');
  }
  async removeProject() {
    const getProjectIndex = (element) => element.id === this.selectedProject.id;
    const index = this.projects.findIndex(getProjectIndex);
    this.selectedProject = await this.projectsService.delete(this.selectedProject);
    this.projects.slice(index, 1);

  }
  compareById(project1, project2) {
    if (project1.id > project2.id) { return 1; }
    if (project1.id < project2.id) { return -1; }
    return 0;
  }

  ngOnInit() {
    // console.log(this.projectsService.create({description: 'project'}));
    // console.log(this.projectsService.getAll());
    // this.getAllProjects();
    this.projectForm = this.formBuilder.group({
      description: [this.selectedProject ? this.selectedProject.description : '', Validators.required],
    });
  }

  modalsubmit() {

  }

}
