import { Component, OnInit } from '@angular/core';
import {DocumentsService} from '../services/documents/documents.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProjectsService } from '../services/projects/projects.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  public name;
  public dev_met;
  public version;
  public imagen;
  public project_id
  saveDocumentForm: FormGroup;  
  public file;
  projects



  constructor(private documentsService:DocumentsService,private formBuilder: FormBuilder,private projectsService:ProjectsService) { }

  ngOnInit() {

    this.getAllProjects();

    this.saveDocumentForm = new FormGroup({
      name: new FormControl(),
      dev_met: new FormControl(),
      version: new FormControl(),
      image: new FormControl(),
      project_id: new FormControl(),
      fileSource: new FormControl(),
    })
  }
  async getAllProjects() {

    this.projectsService.getAll().then((projects) => {
      if ( projects && projects.server !== 'NO_CONTENT') {
        this.projects = projects;
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
  
      reader.onload = () => {
        this.saveDocumentForm.patchValue({
          fileSource: reader.result
       });
      
      };
    }
  }

  saveDocument(){
    const formData = new FormData();
    formData.append('name',this.saveDocumentForm.get('name').value);
    formData.append('dev_met',this.saveDocumentForm.get('dev_met').value);
    formData.append('version',this.saveDocumentForm.get('version').value);
    formData.append('image',this.file);
    formData.append('project_id',this.saveDocumentForm.get('project_id').value);
    this.documentsService.saveDoc(formData).subscribe(
      (data:any)=>{
        console.log(formData)
        if(data){
          console.log(data)
        }
      }
      
    )
  }

  limpiarCampos(){
    this.saveDocumentForm.reset();
  }

}
