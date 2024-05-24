import { Component } from '@angular/core';
import {  FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { User } from '../User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule,NgIf,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login!:FormGroup;
  get email(){
    return this.login.get('email');
  }
  get password(){
    return this.login.get('password');
  }
  get role(){
    return this.login.get('role');
  }
  printdata:string="";
  constructor(private fb : FormBuilder, private registerservice:RegisterService, private router:Router){}
  ngOnInit(){
    this.login = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required]
    })
  }
  submit(){
    console.log(this.login.value);
    const {email,password,role}=this.login.value;
    this.registerservice.login(this.login.value as User).subscribe((m)=>{
      console.log(m);
      localStorage.setItem('authorization',m);
      if(role=="user"){
        this.router.navigate(['/usersidebar'])
      }
      else{
        this.router.navigate(['/adminsidebar'])
      }
    },(error)=>{
      this.printdata=error;
        })
    this.login.reset();
  }
}
