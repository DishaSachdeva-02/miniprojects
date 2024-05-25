import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { EditformComponent } from './editform/editform.component';
import { HomeComponent } from './home/home.component';
import { AppdetailsComponent } from './appdetails/appdetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { UsersidebarComponent } from './usersidebar/usersidebar.component';
import { DownloadComponent } from './download/download.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { UsersidebarComponent } from './usersidebar/usersidebar.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';

export const routes: Routes = [
    {path:"",redirectTo:"/signin",pathMatch:'full'},
    {path:"updateform/:id" , component:EditformComponent},
    {path:"form",component:FormComponent},
    {path:"home",component:HomeComponent},
    {path:"details/:id",component:AppdetailsComponent},
    {path:"dashboard" , component:DashboardComponent},
    {path:"usersidebar",component:UsersidebarComponent},
    {path:"adminsidebar",component:AdminsidebarComponent},
    {path:"userprofile",component:UserprofileComponent},
    {path:"adminprofile", component:AdminprofileComponent},
    {path:"download", component:DownloadComponent},
    {path:"signin",component:SigninComponent},
    {path:"login",component:LoginComponent},

];
