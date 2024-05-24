import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminsidebar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgbNavModule,FormComponent],
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent {
  active = 'top'
}
