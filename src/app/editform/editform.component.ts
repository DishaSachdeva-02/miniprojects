import { Component,ViewEncapsulation,inject, TemplateRef } from '@angular/core';
import {  FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { App } from '../App';

@Component({
  selector: 'app-editform',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule,NgIf,NgbTooltipModule],
  templateUrl: './editform.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
  .my-custom-class .tooltip-inner {
    background-color: blue;
    font-size: 125%;
  }
  .my-custom-class.bs-tooltip-end .tooltip-arrow::before {
    border-right-color: blue;
  }
  .my-custom-class.bs-tooltip-start .tooltip-arrow::before {
    border-left-color: blue;
  }
  .my-custom-class.bs-tooltip-top .tooltip-arrow::before {
    border-top-color: blue;
  }
  .my-custom-class.bs-tooltip-bottom .tooltip-arrow::before {
    border-bottom-color: blue;
  }
`,
})
export class EditformComponent {
  get appName(){
    return this.applicationform.get('appName');
  }
  get description(){
    return this.applicationform.get('description');
  }
  get releaseDate(){
    return this.applicationform.get('releaseDate');
  }
  get version(){
    return this.applicationform.get('version');
  }
  get genre(){
    return this.applicationform.get('genre');
  }
  get downloadCount(){
    return this.applicationform.get('downloadCount');
  }
  get averageRating(){
    return this.applicationform.get('averageRating');
  }
  constructor(private fb : FormBuilder,private activatedroute:ActivatedRoute,private dataservice:DataService,private location:Location){
  }
  status=false;
  applicationform!:FormGroup;
  isTrue() {
    this.status = !this.status;
    this.applicationform.patchValue({
      visibility:this.status
    })
  }
  currdate=new Date();
  ngOnInit(){
    this.applicationform = this.fb.group({
      _id:[''],
      appName : ['Gfg'],
      description : ['Platform to solve coding question',Validators.required],
      releaseDate : [this.currdate.toISOString().slice(0, 10)],
      version:['1.0',Validators.required],
      genre:['',Validators.required],
      visibility:[this.status,Validators.required],
      downloadCount:['3'],
      comments:[''],
      averageRating:['4'],
      
    })
    this.editapp();
  }
  editapp(){
    const id=this.activatedroute.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.dataservice.getapplicationbyid(id).subscribe((app)=>{
        this.applicationform.patchValue({
          _id:id,
          appName:app.appName,
          description:app.description,
          releaseDate:app.releaseDate,
          version:app.version,
          genre:app.genre,
          visibility:app.visibility,
          downloadCount:app.downloadCount,
          comments:app.comments,
          averageRating:app.averageRating
        })
      })
    }
  }
  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  submit=()=>{
    console.log(this.applicationform.value);
    this.dataservice.updateapp(this.applicationform.value as App).subscribe(()=>{
      
      this.goback();
    })
  }
  goback(){
    this.location.back();
  }
  
}
