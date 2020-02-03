import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from '../models/RegisterModel';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public registerForm
  public faWindowClose = faWindowClose
  
  constructor(
    public formBuilder: FormBuilder, 
    public activeModal: NgbActiveModal,
    private authService: AuthenticationService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
     this.registerForm = this.formBuilder.group({
       username: ['', [ Validators.required, Validators.minLength(4)] ],
       email: ['', [ Validators.required, Validators.email, 
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")] ],
       password: ['', [ Validators.required, Validators.minLength(8)] ],
       confirmPassword: ['', [ Validators.required ] ],
     })
  }

  get email() { return this.registerForm.get('email') }
  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }

  public submitForm() {
    const formValue = this.registerForm.value
    const registerModel: RegisterModel = {username: formValue.username, email:formValue.email, password:formValue.password} 
    this.authService.register(registerModel).subscribe(() => {
      this.activeModal.close()
    })
  }

}
