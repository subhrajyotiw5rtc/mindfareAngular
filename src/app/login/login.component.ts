import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }
  txtname :  string;
  txtpwd : string;
  userData : object;
  users : object;

  userLogin(){
    if(this.txtname=='' || this.txtname==null){
      alert('Please enter the username');
      return;
    }else if(this.txtpwd=='' || this.txtpwd==null){
      alert('Please enter the password');
      return;
    }else{
      this.userData = {uname : this.txtname, password : this.txtpwd};
      this.data.userSignin(this.userData).subscribe(docs=>{
        this.users=docs;
        if(this.users['status']==1){
          alert(this.users['msg']);
          this.router.navigate(['./product']);
        }else{
          alert(this.users['msg']);
        }
      })
    }
  }

}
