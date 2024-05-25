import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgbNavModule],
  templateUrl: './usersidebar.component.html',
  styleUrl: './usersidebar.component.css'
})
export class UsersidebarComponent {
  active = 'top'
  constructor(private router:Router){}
  logout(){
    localStorage.removeItem('authorization');
    this.router.navigate(['/login']);
  }
}
