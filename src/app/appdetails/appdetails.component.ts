import { Component } from '@angular/core';
// import { appdata } from '../home/app';
import {   FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, NgFor} from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { App } from '../App';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { comment } from '../Comment';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
@Component({
  selector: 'app-appdetails',
  standalone: true,
  imports: [NgbRatingModule,CommonModule,NgFor,NgbCarouselModule,FormsModule, CommonModule,ReactiveFormsModule,NgbAlertModule],
  templateUrl: './appdetails.component.html',
  styleUrl: './appdetails.component.css'
})
export class AppdetailsComponent {
constructor(private dataservice:DataService,private activatedroute:ActivatedRoute,private fb : FormBuilder,private location:Location){}
selectedapp!:App;
printerror:string="";
getapplicationdetail(){
	const id=this.activatedroute.snapshot.paramMap.get('id');
  if(id){
    this.dataservice.getapplicationbyid(id).subscribe((app)=>{
      console.log(app.comments);
      return this.selectedapp=app;
  });
  }
	
}
commentform!:FormGroup;
ngOnInit(){
	this.getapplicationdetail();
  this.commentform=this.fb.group({
    commentStatement:[''],
    rating:['']
  })
}
  addcomment(){
    const id=this.activatedroute.snapshot.paramMap.get('id');
    if(id){
      this.dataservice.addcomment(this.commentform.value as comment,id).subscribe((comment)=>{
        console.log(comment);
      })
    }
    this.commentform.reset();
    this.getapplicationdetail();
  }
  deletecomment(id:string){
   if(id){
    this.dataservice.deletecomment(id).subscribe({next:()=>{},error:(error)=>{this.printerror=error.error.message}});
    this.getapplicationdetail();
   }
  }
  goback(){
   this.location.back();
  }
}
