import { Component, OnInit } from '@angular/core';
import { ClientserviceService } from '../shared/clientservice.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 import { NgForm } from "@angular/forms";
 import { Router } from "@angular/router";
 import { ActivatedRoute } from '@angular/router';
import { Client } from '../shared/client.model';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(private Clientservice: ClientserviceService, private FormBuilder:FormBuilder,private router:Router,private route: ActivatedRoute) { }
  registerForm: any;
 def:any;
  id:any;
 employeeIdUpdate = null;  
 submitted = false;
 massage = null;  
 abc:any;
 showSucessMessage :any;
emp:any;
form:any;
kbc:any;
 client =
 {
   ClientName :'',
   ClientEmail:'',
   ClientSkype:'',
   ServerDetail:''

 };

   ngOnInit() {
     debugger;
     this.id = this.route.snapshot.params['id'];
     this.def=this.id
     this.registerForm = this.FormBuilder.group(
       {
         ClientName: [""],
         ClientEmail: ["",[Validators.required]],
         ClientSkype: [""],
         ServerDetail: [""]
       },
     );
     this.Editclient(this.def);

    // this.refreshEmployeeList();
   }
   Editclient(def:any)
   {  debugger
     this.Clientservice.editclient(def).subscribe((res)=>
     {
       debugger;
        this.kbc=res;
        this.registerForm.controls['ClientName'].setValue(this.kbc.ClientName);  
        this.registerForm.controls['ClientEmail'].setValue(this.kbc.ClientEmail);  
        this.registerForm.controls['ClientSkype'].setValue(this.kbc.ClientSkype);  
        this.registerForm.controls['ServerDetail'].setValue(this.kbc.ServerDetail); 

     })
   }
   get f() {
     return this.registerForm.controls;
   }
   onSubmit() {
     debugger;
     this.submitted = true;
       if (this.registerForm.invalid) {
       return;
     }
   const employee =  this.registerForm.value;
     if (this.id == null) {  
       this.Clientservice.createEmployee(this.registerForm.value).subscribe(  
         () => {  
          //  this.dataSaved = true;  
        //   this.massage = 'Record saved Successfully';  
          //  this.refreshEmployeeList(); 
           this.employeeIdUpdate = null;  
           this.router.navigate(['/table-list']);
       //    this.registerForm.reset();  

         }  
       );  
     } 
     else 
     {  
       debugger;
       this.id = this.id;  
       employee.id=this.id;
       this.Clientservice.getStudentById(employee).subscribe(() => 
       {  
        this.showSucessMessage = true;
        //  this.getprofile();
        setTimeout(() => this.showSucessMessage = false, 4000);
    //     this.refreshEmployeeList(); 
         this.employeeIdUpdate = null; 
         this.router.navigate(['/upgrade']);
      //   this.registerForm.reset();  
       });  
     }  
   

   }

    
    AddClient()
    {
    this.router.navigate(['/addclient']);
    }
    onLogout(){
    
     this.router.navigate(['/login']);
   }
    refreshEmployeeList()
    {   
      debugger;
      this.Clientservice.getEmployeeList().subscribe((res)=>
      {
        debugger;
         this.abc=res;
      })
    }


}
