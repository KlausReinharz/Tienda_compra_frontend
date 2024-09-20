import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/* Este componente se desarrolla para la verificaicon si el usuario
   que inicio sesion si es cliente o administrador
*/
export class AppComponent {
  title = 'EconmerFront';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLogged();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLogged();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }

  /* metodo para cerrar la sesion del usuario */

  logout(){
    UserStorageService.SignOut();
    this.router.navigateByUrl('login');
  }


}
