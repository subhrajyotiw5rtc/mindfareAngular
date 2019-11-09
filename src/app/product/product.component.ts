import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getProduct().subscribe(docs => {
      console.log('docs',docs);
      this.listOfObject = docs;
      this.listOfProduct = this.listOfObject['docs'];
      const length = Object.keys(this.listOfObject['docs']).length;
      this.count= length;
      if(length > 0){
        this.router.navigate(['./product']);
      }
    })
  }

  txtname :  string;
  txtprice : string;
  txtrating : number;
  userData : object;
  users : object;
  listOfObject : object;
  listOfProduct : object;
  count : number;
  id : string;
  isSaveShown : boolean = true;
  isEditShown : boolean =false;
  pid : string = '';

  
  
  save(){
    if(this.txtname=='' || this.txtname==null){
      alert('Please enter the name');
      return;
    }else if(this.txtprice=='' || this.txtprice==null){
      alert('Please enter the price');
      return;
    }else if(this.txtrating==null){
      alert('Please enter the rating');
      return;
    }else{
      this.userData = {name : this.txtname, price : this.txtprice, rating : this.txtrating};
      this.data.saveProduct(this.userData).subscribe(docs=>{
        this.users=docs;
        if(this.users['status']==1){
          alert(this.users['msg']);
          location.reload();
          this.router.navigate(['./product']);
        }else{
          alert(this.users['msg']);
        }
      })
    }
  }

  update(){
    if(this.txtname=='' || this.txtname==null){
      alert('Please enter the name');
      return;
    }else if(this.txtprice=='' || this.txtprice==null){
      alert('Please enter the price');
      return;
    }else if(this.txtrating==null){
      alert('Please enter the rating');
      return;
    }else{
      this.userData = {name : this.txtname, price : this.txtprice, rating : this.txtrating, id : this.pid};
      this.data.updateProduct(this.userData).subscribe(docs=>{
        this.users=docs;
        if(this.users['status']==1){
          alert(this.users['msg']);
          location.reload();
          this.router.navigate(['./product']);
        }else{
          alert(this.users['msg']);
        }
      })
    }
  }

  edit(id){
    this.id=id;
    this.userData = {id : this.id};
    this.data.editProduct(this.userData).subscribe(docs=>{
      docs['docs'].forEach(ele => {
        this.txtname = ele.name;
        this.txtprice = ele.price;
        this.txtrating = ele.rating;
        this.pid = ele._id;
      });
      this.isEditShown = true;
      this.isSaveShown = false;
    })
  }

  delete(id){
    this.id=id;
    this.userData = {id : this.id};
    if(window.confirm('Are sure you want to delete this item ?')){
      this.data.deleteProduct(this.userData).subscribe(docs=>{
        this.users=docs;
        if(this.users['status']==1){
          alert(this.users['msg']);
          location.reload();
          this.router.navigate(['./product']);
        }else{
          alert(this.users['msg']);
        }
      })
    }
  }


}
