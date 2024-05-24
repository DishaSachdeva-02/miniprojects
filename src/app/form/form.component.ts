import { Component,ViewEncapsulation,inject, TemplateRef } from '@angular/core';
import {  FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { App } from '../App';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule,NgIf,NgbTooltipModule],
  templateUrl: './form.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrl: './myform.component.css',
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
export class FormComponent {
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
  constructor(private fb : FormBuilder,private dataservice:DataService,private location:Location){
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
      appName : ['',[Validators.required,Validators.minLength(3)]],
      description : ['',[Validators.required,Validators.minLength(5)]],
      releaseDate : [this.currdate.toISOString().slice(0, 10),Validators.required],
      version:['',Validators.required],
      genre:['Health',Validators.required],
      visibility:[this.status,Validators.required],
      downloadCount:['0'],
      comments:[''],
      averageRating:['0']
    })
  }
  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  submit=()=>{
    console.log(this.applicationform.value);
    this.dataservice.addapp(this.applicationform.value  as App).subscribe(()=>{
      this.goback();
    })
    this.applicationform.reset();
  }
  goback(){
    this.location.back();
  }
}
