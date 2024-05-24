import { Component } from '@angular/core';
// import { appdata } from '../home/app';
import { NgFor ,CommonModule} from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { App } from '../App';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appdetails',
  standalone: true,
  imports: [NgFor,NgbRatingModule,CommonModule],
  templateUrl: './appdetails.component.html',
  styleUrl: './appdetails.component.css'
})
export class AppdetailsComponent {
constructor(private dataservice:DataService,private activatedroute:ActivatedRoute){}
selectedapp!:App;
getapplicationdetail(){
	const id=this.activatedroute.snapshot.paramMap.get('id');
  if(id){
    this.dataservice.getapplicationbyid(id).subscribe((app)=>{
      console.log(app);
      return this.selectedapp=app;
  });
  }
	
}
ngOnInit(){
	this.getapplicationdetail();
}
  
}
