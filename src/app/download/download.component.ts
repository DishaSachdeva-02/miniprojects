import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../App';
import { DataService } from '../data.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-download',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,NgbRatingModule,RouterOutlet,NgbAlertModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  downloadeddata:App[]=[]
 printerror:string="";
 constructor(private dataservice:DataService,private router:Router,private cdr: ChangeDetectorRef,private location:Location){}
 ngOnInit(){
  this.getdownloads();
  console.log(this.downloadeddata);
 }
  getdownloads(){
   this.dataservice.getdownload().subscribe((app)=>{
    app.forEach(a=>{
      this.dataservice.getapplicationbyid(a).subscribe({next:(application)=>{
        if(application!==undefined){
          this.downloadeddata.push(application);
        }
       
      }})
    })

    console.log(this.downloadeddata);
  });
  
  }
  delete(a:App){ 
    this.dataservice.deletedownload(a._id).subscribe({
      next:(m)=>{
        if(m){
          this.downloadeddata=this.downloadeddata?.filter(app=>app._id!=a._id);
          console.log(this.downloadeddata);
        }
        this.printerror="";
       
      },error:(error)=>{
        
        this.printerror=error.error.message;
        this.cdr.detectChanges();
        console.log(this.printerror);
      }
    })
   }
  goback(){
    this.location.back();
   }
   
}
