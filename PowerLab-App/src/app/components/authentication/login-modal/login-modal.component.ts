import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LoginModel } from '../models/LoginModel';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  protected loginForm
  protected faWindowClose = faWindowClose
  
  constructor(
    protected formBuilder: FormBuilder, 
    protected activeModal: NgbActiveModal,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, 
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")] ],
      password: ['', [Validators.required, Validators.minLength(8)] ]
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  public submitForm() {

    if(this.loginForm.invalid) {return}

    this.authService.login(this.loginForm.value).subscribe(() => {
      const formValue = this.loginForm.value
      const loginModel: LoginModel = {email: formValue.email, password: formValue.password}
      this.authService.login(loginModel).subscribe(() => this.activeModal.close())
    })
    
  }
}


