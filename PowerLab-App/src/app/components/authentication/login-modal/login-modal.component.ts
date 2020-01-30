import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public loginForm
  public faWindowClose = faWindowClose
  
  constructor(public formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

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
    this.activeModal.close(this.loginForm.value)
  }
}


