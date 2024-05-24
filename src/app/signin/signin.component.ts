import { Component } from '@angular/core';
import {  FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { User } from '../User';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule,NgIf,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signin!:FormGroup;
  get email(){
    return this.signin.get('email');
  }
  get password(){
    return this.signin.get('password');
  }
  get role(){
    return this.signin.get('role');
  }
  printdata:string="";
  constructor(private fb : FormBuilder, private registerservice:RegisterService,private router:Router){}
  ngOnInit(){
    this.signin = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required]
    })
  }
  submit(){
    console.log(this.signin.value);
   
    this.registerservice.register(this.signin.value as User).subscribe((m)=>{
      console.log(m);
      this.router.navigate(['/login']);
    },(error)=>{
      this.printdata=error;
      }
    )
    this.signin.reset();
  }
}
