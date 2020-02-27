import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from './story';

@Component({
  selector: 'app-productbacklog',
  templateUrl: './productbacklog.component.html',
  styleUrls: ['./productbacklog.component.scss']
})
export class ProductbacklogComponent implements OnInit {

  @Input() projectId: number;
  stories: Story[] = [
    {
      id: 1,
      description: "Como product owner puedo descargar un proyecto para...",
      epic: true,
      priority: 0,
      done: true,
      project_id: 1,
      date_created: new Date(Date.now())
    },
    {
      id: 2,
      description: "No, no, no... Por \"ahí\" NO!",
      epic: false,
      priority: 1,
      done: false,
      project_id: 1,
      date_created: new Date(Date.now())
    },
    {
      id: 3,
      description: "Si, si, si... Por \"ahí\" SI!",
      epic: true,
      priority: 2,
      done: false,
      project_id: 1,
      date_created: new Date(Date.now())
    }
  ];

  story : Story;

  addEditStoryForm: FormGroup;
  addMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { this.projectId = this.route.snapshot.params.id; }

  async createStory() {
    const formData = new FormData();
    formData.append('description', this.addEditStoryForm.get('description').value);
    formData.append('project_id', this.projectId.toString());
    formData.append('priority', this.addEditStoryForm.get('priority').value);
    formData.append('epic', this.addEditStoryForm.get('epic').value);
    formData.append('done', this.addEditStoryForm.get('done').value);
    // Llamada al servicio
  }

  async editStory() {
    const formData = new FormData();
    formData.append('id', this.story.id.toString());
    formData.append('description', this.addEditStoryForm.get('description').value);
    formData.append('project_id', this.projectId.toString());
    formData.append('priority', this.addEditStoryForm.get('priority').value);
    formData.append('epic', this.addEditStoryForm.get('epic').value);
    formData.append('done', this.addEditStoryForm.get('done').value);
    // Llamada al servicio
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditStoryForm = this.formBuilder.group({
      description: ['', Validators.required],
      priority: [0],
      epic: [false],
      done: [false]
    });
  }

  initializeEditForm(story : Story) {
    this.story = story;
    this.addMode = false;
    this.addEditStoryForm = this.formBuilder.group({
      description: [this.story.description, Validators.required],
      priority: [this.story.priority],
      epic: [this.story.epic],
      done: [this.story.done]
    });
  }

  ngOnInit() {
    this.initializeAddForm();
  }

}
