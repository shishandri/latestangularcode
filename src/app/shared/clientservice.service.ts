import { Injectable } from '@angular/core';
 import { NgForm } from "@angular/forms";
 import { Router } from "@angular/router";
 import { HttpClient } from '@angular/common/http';
 import { environment } from '../../environments/environment';
 import { Client } from '../shared/client.model';
@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {

 selectedUser: Client = 
 {
        ClientName :'',
        ClientEmail:'',
        ClientSkype:'',
        ServerDetail:''
      };
      id:any;
    
    constructor(private http: HttpClient) { }
    
    //HttpMethods
    editclient(emp:any)
    {
      debugger;
      return this.http.get(environment.apiBaseUrl + '/get' + `/${emp}`,emp); 
    }
    deleteclient(emp:any)
     { debugger
      return this.http.delete(environment.apiBaseUrl + '/delete' + `/${emp._id}`); 

      }  
     getStudentById(emp:any) 
     {    
      debugger;
      return this.http.put(environment.apiBaseUrl + '/update' + `/${emp.id}`,emp); 
    }
  
    createEmployee(client: Client){
      debugger;
      return this.http.post(environment.apiBaseUrl+'/employeepost',client);
    }
    getEmployeeList()
    {debugger;
      return this.http.get(environment.apiBaseUrl+'/employees');
    }
    
}
