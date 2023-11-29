import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { environment } from 'src/environments/environment';
import { CountryService } from '../../countries/country.service';
import { GendersService } from '../../genders/genders.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'createOrEditUser',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss']
})
export class CreateOrEditUserComponent implements OnInit {

  @Input() modal: any = "CreateOrEditUserModal";
  @Input() title: string = "Registar Utilizador";
  @Input() user: any;

  submitted = false;
  public countries: any = [];
  public genders: any = [];
  private loading = false;

  @Input() userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _http_client: HttpClient,
    private userService: UsersService,
    private aplicationService: ApplicationService,
    //private genderService: GendersService,
    //private countryService: CountryService
  ) {

    this.userForm = this.fb.group({
      uuid: [{ value: null, disabled: true }],
      username: [null, Validators.required],
      cell_phone: [null, Validators.required],
      password: [null, Validators.required],
      surname: [null, Validators.required],
      email: [null, Validators.required],
      gender_id: [null, Validators.required],
      country_id: [null, Validators.required],
    });

    this.selectBoxCountries();
    this.selectBoxGenders();
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }


  selectBoxCountries() {
    this.countryService
      .listOfCountries()
      .subscribe(res => {
        this.countries = Object(res).data
      })
  }

  selectBoxGenders() {
    this.genderService
      .listOfGenders(null)
      .subscribe(res => {
        this.genders = Object(res).data
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.user !== undefined) {
      this.title = "Editar Utilizador";
      this.userForm.patchValue(this.user);
    } else {
      this.title = "Registar Utilizador";
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const url = this.userForm.getRawValue().id == null
      ? `auth/sign_up` : `auth/sign_up/'${this.userForm.getRawValue().id}`
    this.createOrEdit(url, this.userForm.value)
  }

  createOrEdit(url: any, form: FormGroup) {
    this._http_client.post<any>(`${environment.fullBaseUrl}/${url}`, form, { headers: this.aplicationService.headers })
      .subscribe(res => {
        this.submitted = false;
        if (Object(res).success == true) {
          this.aplicationService.SwalSuccess("Utilizador registado com sucesso!");
          this.onReset()
        }
      })
  }

}
