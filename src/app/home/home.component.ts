import { Component ,inject, TemplateRef} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../App';
import { DataService } from '../data.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,NgbRatingModule,RouterOutlet,NgbAlertModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 applicationdata!:App[]
 printerror:string="";
 constructor(private dataservice:DataService,private router:Router,private cdr: ChangeDetectorRef,private location:Location){}
 ngOnInit(){
  this.getapplication();
  console.log(this.applicationdata);
 }
  getapplication(){
   this.dataservice.getapplication().subscribe((app)=>{
    this.applicationdata=app
    console.log(this.applicationdata);
  });
  
  }
   delete(a:App){ 
    this.dataservice.deleteapplication(a._id).subscribe({
      next:(m)=>{
        if(m){
          this.applicationdata=this.applicationdata?.filter(app=>app!=a);
        }
        this.printerror="";
       
      },error:(error)=>{
        
        this.printerror=error.error.message;
        this.cdr.detectChanges();
        console.log(this.printerror);
      }
    })
   }
   edit(a:App){
    this.dataservice.updateapp(a).subscribe({
      next:(m)=>{
        if(m){
          console.log(m);
          this.router.navigate([`/updateform/${a._id}`])
        }
       
      },
      error:(error)=>{
        this.printerror="";
        this.printerror=error.error.message;
        console.log(this.printerror);
      }
    })
   }
   addtodownloads(l:App){
    this.dataservice.addtodownload(l._id).subscribe((m)=>{
      console.log(m);
    });
   }
   goback(){
    this.location.back();
   }
   private modalService = inject(NgbModal);
   closeResult = '';
 
   open(content: TemplateRef<any>) {
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
       (result) => {
         this.closeResult = `Closed with: ${result}`;
       },
       (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       },
     );
   }
 
   private getDismissReason(reason: any): string {
     switch (reason) {
       case ModalDismissReasons.ESC:
         return 'by pressing ESC';
       case ModalDismissReasons.BACKDROP_CLICK:
         return 'by clicking on a backdrop';
       default:
         return `with: ${reason}`;
     }
   }
}
