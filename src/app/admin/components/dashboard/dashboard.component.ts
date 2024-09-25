import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products:any[] = [];

  searchProductForm!: FormGroup;


  constructor(
    private adminService: AdminService,
    private fb:FormBuilder

  ){}

  ngOnInit(): void {
    this.getAllProduct();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })

  }

  getAllProduct(){
    this.products = [];
    this.adminService.getAllProduct().subscribe(res =>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllCategoriesByName(title).subscribe(res =>{
      res.forEach (element=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }


}
