import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 showSucessMessage:any;
 usertype: any = ['Hr','Developer']
 tlassociated: any = ['Manish kharewal ','Deepak Sharma']
  userDetails:any;
  usrtypchcked:any;
  tlassociatedchcked:any;
  gendervalue:any;
  abc:any;
  web:any;
  profilepic:any;
  add:any;
  value: any
  mob:any;
  fileUploadForm: any;
  fileInputLabel: any;
  url:any;
  urlimg:String='https://i.ibb.co/fDWsn3G/buck.jpg';
  alternative:any;
  employeeForm: any; 
  genderselect:any;
  nomph:any;
  nomname:any;
  tlass:any;
  gender:any;
  alternativeno:any;
  mobileno:any;
  personalno:any;
  submitted = false;
  currentaddress:any;
  PersonalEmail:any;
  permanentaddress:any;
  genderchecked:any;
  genderchecked1:any;
  fstname:any;
  lstname:any;
  bio:any;
  constructor(private userService: UserService,private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }
 
  ngOnInit() {
    debugger;
   this.fileUploadForm = this.formBuilder.group({
    firstname: [""],
    lastname: [""],
    currentaddress: [""],
    gender:[""],
    permanentaddress:[''],
    mobileno: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
     alternativeno:['',[Validators.required]],
    tlassociated: [''],
    usertype: [''],
    nomineename:[''],
    nomineeno:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
    bio:[''],
    // NominePhNumber: [''],
    // // DocumentUpload: [''],
    uploadedimage: [''],
  });
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        debugger;
       
        this.userDetails = res['user']._id;
        this.url=res['user'];
       
        this.urlimg = this.url.uploadedimage;
        this.nomph = this.url.nomineeno;
        this.nomname = this.url.nomineename; 
        this.tlass = this.url.Tlassociated;
        this.fstname = this.url.firstname;
        this.lstname = this.url.lastname;
        this.abc = this.url.usertype;
        this.gender = this.url.gender;
        this.alternativeno =  this.url.alternativeno;
        this.mobileno = this.url.mobileno;
        this.currentaddress = this.url.currentaddress;
        this.permanentaddress = this.url.permanentaddress; 
        this.bio = this.url.bio; 
        this.PersonalEmail = this.url.PersonalEmail;
        if(this.gender=='male')
        {
          debugger;
          this.genderchecked=true;
        }
        else{
          this.genderchecked1=true;
        }
      },
      )
      // },
    //   err => {
    //     console.log(err);
    //   }
    // );
   
    // this.getprofile();
  }

  changeWebsite(e:any) 
  {
    console.log(e.target.value);
    this.usrtypchcked=e.target.value;
  }
    changeWebsite1(e:any) 
  {
    console.log(e.target.value);
    this.tlassociatedchcked=e.target.value;
  }
  changeGender(e:any) {
    debugger;
    console.log(e.target.value);
    this.genderselect=e.target.value;
  }

  onFileSelect(event:any) {
     debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
         this.urlimg = reader.result as string;
     
        this.fileUploadForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedimage').setValue(file);
  }
 
  // get f() { return this.fileUploadForm.controls; }
  onFormSubmit() {
     debugger;
 
    //  this.submitted = true;

    //  // stop here if form is invalid
    //  if (this.fileUploadForm.invalid) {
    //      return;
    //  }
  const formData = new FormData();
        // formData.append('PersonalEmail', this.fileUploadForm.get('PersonalEmail').value);
        formData.append('currentaddress', this.fileUploadForm.get('currentaddress').value);
        formData.append('permanentaddress', this.fileUploadForm.get('permanentaddress').value);
        formData.append('gender',this.genderselect);
        formData.append('_id', this.userDetails._id);
        formData.append('mobileno', this.fileUploadForm.get('mobileno').value);
        formData.append('alternativeno', this.fileUploadForm.get('alternativeno').value);
        formData.append('usertype', this.usrtypchcked);
        formData.append('tlassociated', this.tlassociatedchcked);
        formData.append('nomineename', this.fileUploadForm.get('nomineename').value);
        formData.append('nomineeno', this.fileUploadForm.get('nomineeno').value);
     formData.append('bio', this.fileUploadForm.get('bio').value);
         formData.append('uploadedimage', this.fileUploadForm.get('uploadedimage').value);
    this.http
    .post<any>('http://localhost:3000/api/userprofilepic',formData).subscribe(response => {
      debugger;
      this.showSucessMessage = true;
    //  this.getprofile();
    setTimeout(() => this.showSucessMessage = false, 4000);

    });

  }
      
         
      
     
    
// getprofile()
// {
//   debugger;
//   this.userService.getUserProfile1().subscribe((res:any) => {
//     debugger;
//       this.url=res['user'];
//       this.urlimg = this.url.uploadedimage;
//       this.nomph = this.url.NominePhNumber;
//       this.nomname = this.url.Nominename; 
//       this.tlass = this.url.Tlassociated;
//       this.abc = this.url.usertype;
//       this.gender = this.url.gender;
//       this.alternativeno =  this.url.alternativeno;
//       this.mobileno = this.url.mobileno;
//       this.currentaddress = this.url.currentaddress;
//       this.permanentaddress = this.url.permanentaddress; 
//       this.PersonalEmail = this.url.PersonalEmail;
//       if(this.gender=='male')
//       {
//         debugger;
//         this.genderchecked=true;
//       }
//       else{
//         this.genderchecked1=true;
//       }
//     },
   
//   );
// }


  onLogout()
  {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
 
}