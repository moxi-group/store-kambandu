import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router';

import Swal  from 'sweetalert2'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApplicationService {
    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)


    constructor(
        private router: Router,
        private _http_client: HttpClient,
        
    ) {}


    // ===========================================================================================
    // ===================================== PERMISSIONS =========================================


    CloseModal(modalId: string){
        let element: any = document.getElementById(modalId)
        element.click()
    }

    SwalSuccess(title: string){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    }

    SwalDanger(title: string){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    }


    SwalConfirmation(title: string, description: string){
        return Swal.fire({
            title: title,
            text: description,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        })
    }


    SwalDangerConfirmation(title: string){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: title      
        })
    }

    SwalConfirmationUpload(){
        return Swal.fire({
            title: 'Tens certeza?',
            text: "Confirmação do processamento do documento",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, confirmar!'
        })
    }

    postFile(fileToUpload: File, url: string) {
        const formData: FormData = new FormData()
        formData.append('document', fileToUpload, fileToUpload.name)

        const request = new HttpRequest(
            'POST',
            url,
            formData
        )

        return this._http_client.request(request)
    }



}
