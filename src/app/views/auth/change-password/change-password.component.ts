import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/api/application.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {
    user: any = {
        current_password: null,
        new_password: null
    }

    loading: boolean = false

    constructor(
        private _authService: AuthService,
        private _applicationService: ApplicationService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    _changePassword() {
        if (this.user.current_password == null) {
          this._applicationService.SwalDanger("O campo Senha Actual é obrigatório")
          return
        }
    
        if (this.user.new_password == null) {
          this._applicationService.SwalDanger("O campo Nova Senha é obrigatório")
          return
        }
    
        this.loading = true
    
        this._authService.changePassword(this.user)
          .subscribe(
            response => {
              let result = response
              sessionStorage.setItem('sessionToken', result.access_token)
    
              let user = JSON.stringify(result.data)
              sessionStorage.setItem('currentUser', user)
    
              let sales_box = result.sales_box
              if (Boolean(sales_box)) {
                sessionStorage.setItem('CURRENT_CAIXA', JSON.stringify(sales_box))
              }
    
              this._authService.userLogged = true
              this._authService.showLayoutEmitter.emit(true)
              this._applicationService.SwalSuccess('Senha alterada com sucesso')
              this._authService.removeTokenOfUser()
    
              this.loading = false
            },
            (error) => {
              if (!error.ok) {
                console.log(error);
                
                this._authService.userLogged = false
                this._authService.showLayoutEmitter.emit(false)
                this._applicationService.SwalDanger(error.error.detail)
                this.router.navigate(['/change-password'])
                this.loading = false
              }
            }
          )
      }
    



}
