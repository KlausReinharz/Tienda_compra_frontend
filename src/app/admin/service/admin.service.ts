import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  //agregar categorias al dashboard

  addCategory(categoryDto: any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers:this.createAuthorizationHeader()
    })
  }
  //Este servicio es para el componente post-product
  getAllCategories():Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin',  {
      headers:this.createAuthorizationHeader()
    })
  }

  addProduct(productDto: any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
      headers:this.createAuthorizationHeader()
    })
  }
  //Este servico es para obtener los producto
  //para mostrar en el component dashboard
  getAllProduct():Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/products',  {
      headers:this.createAuthorizationHeader()
    })
  }

  //
  getAllCategoriesByName(name : any):Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/search/${name}`,  {
      headers:this.createAuthorizationHeader()
    })
  }


  deleteProduct(productId: any):Observable<any>{
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`,  {
      headers:this.createAuthorizationHeader()
    })
  }

  addCoupon(couponDto:any):Observable<any>{
    return this.http.post(BASIC_URL+ 'api/admin/coupons', couponDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getCoupons():Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers:this.createAuthorizationHeader()
    })
  }

  //observacion tanto como el backend y el frontend el 'Bearer ' -> debe estar con un espacio
  //el token se generar de forma incorrecta e invalida
  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
