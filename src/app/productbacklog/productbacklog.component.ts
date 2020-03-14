import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from './story';
import { StoriesService } from '../services/stories/stories.service';
import { SprintService } from '../services/sprint/sprint.service';

@Component({
  selector: 'app-productbacklog',
  templateUrl: './productbacklog.component.html',
  styleUrls: ['./productbacklog.component.scss']
})
export class ProductbacklogComponent implements OnInit {

  @Input() projectId: number;
  id: string;
  stories: Story[];
  storiesDuplicate: any[];
  storiesToAssign: any[];
  story: Story;
  addEditStoryForm: FormGroup;
  addMode = true;
  newSprint = false;
  sprintId = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private storiesService: StoriesService,
    private sprintService: SprintService
  ) {
    this.projectId = this.route.snapshot.params.id;
    this.getSprint();
  }

  ngOnInit() {
    this.initializeAddForm();
    this.getAllStories();
    this.storiesToAssign = [];
    this.stories = [];
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
    formData.append('priority', this.castingPriority(this.addEditStoryForm.get('priority').value));
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
    formData.append('priority', this.castingPriority(this.addEditStoryForm.get('priority').value));
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

  castingPriority(value: any) {
    const priority = +value;
    switch (priority) {
      case 0:
        return 'high';
      case 1:
        return 'medium';
      case 2:
        return 'low';
    }
  }

  generateSprint() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.router.navigate(['sprint', this.projectId], {queryParams: {'user_id': currentUser.userId}});
  }

  sprintPlanning() {
    this.router.navigate(['sprintplanning']);
  }

  sprintRetrospective() {
    this.router.navigate(['sprintretrospective']);
  }

  getSprint() {
    this.sprintService.getSprintActive(this.projectId).subscribe((res: any) => {
      if (res.server) {
        this.newSprint = true;
      } else {
        this.newSprint = false;
        this.sprintId = res[0].id;
      }
    });
  }

  sprintTechnical() {
    this.router.navigate(['sprinttechnical']);
  }

}
