import { Injectable } from '@angular/core';

const TOKEN ='ecom-token';
const USER ='ecom-user';
//este servicio gestionara el almacenamiento y recuperación de los datos de
//autenticación  de los usuarios
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  /*Guarda el token de autenticación en el localStorage.
   * Primero elimina cualquier valor previo asociado a la
   * clave TOKEN, y luego almacena el nuevo token. */
  public saveToken(token: string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  /*Guarda la información del usuario en formato JSON en el localStorage. */
  public saveUser(user):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  /*Recupera el token almacenado en el localStorage usando la clave TOKEN.*/
  static getToken():string{
    return localStorage.getItem(TOKEN);
  }

  /*Recupera y convierte de vuelta a un objeto
  la información del usuario almacenada como una
  cadena JSON bajo la clave USER. */
  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }

  /*Recupera el ID del usuario desde los datos almacenados en
  localStorage. Si no existe el usuario, devuelve una cadena vacía. */
  static getUserId():string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.userId;
  }

  /*Recupera el rol del usuario desde el almacenamiento local.
  Si no hay usuario, devuelve una cadena vacía. */
  static getUserRole():string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }


  static isAdminLoggedIn():boolean{
    if(this.getToken === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLogged():boolean{
    if(this.getToken === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static SignOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
