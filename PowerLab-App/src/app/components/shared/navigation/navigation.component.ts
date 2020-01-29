import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../authentication/register-modal/register-modal.component';
import { LoginModalComponent } from '../../authentication/login-modal/login-modal.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openRegisterModal() {
    const registerRef = this.modalService.open(RegisterModalComponent)
    registerRef.result.then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  openLoginModal() {
    const loginRef = this.modalService.open(LoginModalComponent)
    loginRef.result.then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

}
