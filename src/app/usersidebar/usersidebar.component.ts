import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

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
}
