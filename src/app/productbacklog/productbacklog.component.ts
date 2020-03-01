import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from './story';
import { StoriesService } from '../services/stories/stories.service';

@Component({
  selector: 'app-productbacklog',
  templateUrl: './productbacklog.component.html',
  styleUrls: ['./productbacklog.component.scss']
})
export class ProductbacklogComponent implements OnInit {

  @Input() projectId: number;
  id: string;
  stories: Story[] = [
    {
      id: 1,
      description: 'Como product owner puedo descargar un proyecto para...',
      epic: true,
      priority: 0,
      done: true,
      project_id: 1,
      date_created: new Date(Date.now()),
      parent_id: null
    },
    {
      id: 2,
      description: 'No, no, no... Por "ahí" NO!',
      epic: false,
      priority: 1,
      done: false,
      project_id: 1,
      date_created: new Date(Date.now()),
      parent_id: null
    },
    {
      id: 3,
      description: 'Si, si, si... Por "ahí" SI!',
      epic: true,
      priority: 2,
      done: false,
      project_id: 1,
      date_created: new Date(Date.now()),
      parent_id: null
    }
  ];
  storiesDuplicate: any[];
  storiesToAssign: any[];
  story: Story;
  addEditStoryForm: FormGroup;
  addMode = true;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storiesService: StoriesService
  ) {
    this.projectId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.initializeAddForm();
    this.getAllStories();
    this.storiesToAssign = [];
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

  initializeEditForm(story: Story) {
    this.story = story;
    this.addMode = false;
    this.addEditStoryForm = this.formBuilder.group({
      description: [this.story.description, Validators.required],
      priority: [this.story.priority],
      epic: [this.story.epic],
      done: [this.story.done]
    });
  }

  initializeAssignStories(story: Story) {
    this.story = story;
  }

  async getAllStories() {
    this.storiesService.getAll(this.projectId).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.stories = response;
      }
      console.log(response);
    });
  }

  async createStory() {
    const formData = new FormData();
    formData.append('description', this.addEditStoryForm.get('description').value);
    formData.append('project_id', this.projectId.toString());
    formData.append('priority', 'high');
    formData.append('epic', this.addEditStoryForm.get('epic').value);
    formData.append('done', this.addEditStoryForm.get('done').value);
    console.log(this.addEditStoryForm.get('epic'));
    const newStory: any = await this.storiesService.create(formData);
    if (newStory && newStory.server !== 'ERROR') {
      this.stories.push(newStory);
    }
  }

  async editStory() {
    const index = this.findIndexStory(this.story);
    const formData = new FormData();
    formData.append('description', this.addEditStoryForm.get('description').value);
    formData.append('project_id', this.projectId.toString());
    formData.append('priority', this.addEditStoryForm.get('priority').value);
    formData.append('epic', this.addEditStoryForm.get('epic').value);
    formData.append('done', this.addEditStoryForm.get('done').value);
    this.storiesService.edit(this.story, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.stories = [...this.stories.slice(0, index), response, ...this.stories.slice(index + 1, this.stories.length)];
      }
    });
  }

  async removeStory() {
    const i = this.findIndexStory(this.story);
    await this.storiesService.delete(this.story);
    this.stories = [...this.stories.slice(0, i), ...this.stories.slice(i + 1, this.stories.length)];
  }

  async addStoryToEpic() {
    this.storiesToAssign.forEach((story) => {
      const index = this.findIndexStory(story);
      this.storiesService.addStoryToEpic(story.id, this.story.id).then((response: any) => {
        console.log('response');
        console.log(response);
        if (response && response.server !== 'ERROR') {
          this.stories = [...this.stories.slice(0, index), response, ...this.stories.slice(index + 1, this.stories.length)];
        }
      });
    });
  }

  selectStory(story: any, action?: string) {
    if (action === 'add') {
      const i = this.findIndexStory(story, 'add');
      if (i < 0) {
        this.storiesToAssign.push(story);
      }
    } else {
      this.story = story;
    }
  }


  Search() {

    this.storiesDuplicate = [...this.stories.map(element => JSON.parse(JSON.stringify(element)))];

    if (this.id && this.id.length > 0) {
      this.stories = this.stories.filter(res => {
        return res.id === +this.id;
      });
    } else {
      this.stories = this.storiesDuplicate;
    }
  }

  resetStoriesList() {
    if (this.id.length === 0) {
      this.stories = [...this.storiesDuplicate.map(element => JSON.parse(JSON.stringify(element)))];
    }
  }

  findIndexStory(story: any, action?: string) {
    if (action === 'add') {
      const getStoryIndex = (element) => element.id === story.id;
      const index = this.storiesToAssign.findIndex(getStoryIndex);
      return index;
    } else {
      const getStoryIndex = (element) => element.id === story.id;
      const index = this.stories.findIndex(getStoryIndex);
      return index;
    }

  }
}
