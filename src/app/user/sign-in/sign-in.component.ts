import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
 import { UserService } from '../../shared/user.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private authservice: AuthService,private router: Router) { }
  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages:any;

  ngOnInit()
   {
    debugger;
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard');
    this.authservice.logout();  
   
  }
    
 

  onSubmit(form : NgForm)
  {
    debugger;
    this.userService.login(form.value).subscribe(
      (res:any) => {
        debugger;
      this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}