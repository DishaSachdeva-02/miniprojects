import { Component } from '@angular/core';
// import { appdata } from './app';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { App } from '../App';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,NgbRatingModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 applicationdata!:App[]
 constructor(private dataservice:DataService){}
 ngOnInit(){
  this.getapplication();
  console.log(this.applicationdata);
 }
  getapplication(){
   this.dataservice.getapplication().subscribe((app)=>this.applicationdata=app);
  
  }
   delete(a:App){
     this.applicationdata=this.applicationdata?.filter(app=>app!=a);
    this.dataservice.deleteapplication(a._id).subscribe()
   }
}
