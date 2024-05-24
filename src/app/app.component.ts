import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgbNavModule,FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appstore';
  
}
