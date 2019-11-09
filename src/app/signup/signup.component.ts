import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }
  txtname :  string;
  txtpwd : string;
  txtemail : string;
  userData : object;
  users : object;

  userSignup(){
    if(this.txtname=='' || this.txtname==null){
      alert('Please enter the username');
      return;
    }else if(this.txtemail=='' || this.txtemail==null){
      alert('Please enter the email');
      return;
    }else if(this.txtpwd=='' || this.txtpwd==null){
      alert('Please enter the password');
      return;
    }else{
      this.userData = {uname : this.txtname, password : this.txtpwd, email : this.txtemail};
      this.data.userSignup(this.userData).subscribe(docs=>{
        this.users=docs;
        if(this.users['status']==1){
          alert(this.users['msg']);
          this.router.navigate(['./login']);
        }else{
          alert(this.users['msg']);
        }
      })
    }
  }

}
