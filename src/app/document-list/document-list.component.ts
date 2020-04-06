import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsService } from '../services/documents/documents.service';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  document_list = [];
  constructor(private documentsService:DocumentsService,private router: Router) { }

  ngOnInit() {

    this.documentsService.getAll().subscribe(data=>{
      if (data){
        if (!data.error){
          console.log(data);
          this.document_list = data;
        }
      }
    })
  }

  createInitDocument(){
    this.router.navigate(['documents']);

  }

}
