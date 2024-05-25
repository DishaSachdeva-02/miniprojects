import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminsidebar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgbNavModule,FormComponent],
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent {
  active = 'top'
  constructor(private router:Router){}
  logout(){
    localStorage.removeItem('authorization');
    this.router.navigate(['/login']);
  }
}
