import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL: string = 'http://localhost:3000/admin/';

  constructor(private http: HttpClient) { }

  userSignup(userData){
    return this.http.post(this.apiURL+'signup',userData);
  }

  userSignin(userData){
    return this.http.post(this.apiURL+'login',userData);
  }

  saveProduct(userData){
    return this.http.post(this.apiURL+'saveProduct',userData);
  }

  getProduct(){
    return this.http.get(this.apiURL+'getProduct');
  }

  editProduct(userData){
    return this.http.post(this.apiURL+'editProduct',userData);
  }

  deleteProduct(userData){
    return this.http.post(this.apiURL+'deleteProduct',userData);
  }

  updateProduct(userData){
    return this.http.post(this.apiURL+'updateProduct',userData);
  }
}
