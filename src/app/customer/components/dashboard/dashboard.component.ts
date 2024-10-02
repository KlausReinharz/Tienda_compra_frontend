import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products:any[] = [];

  searchProductForm!: FormGroup;


  constructor(
    private customerService: CustomerService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar

  ){}

  ngOnInit(): void {
    this.getAllProduct();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })

  }

  getAllProduct(){
    this.products = [];
    this.customerService.getAllProduct().subscribe(res =>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllCategoriesByName(title).subscribe(res =>{
      res.forEach (element=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  addToCart(id:any){
    this.customerService.addToCart(id).subscribe(res=>{
      this.snackBar.open("Product added to cart succesfully","Close",{duration:5000})
    })
  }

}
