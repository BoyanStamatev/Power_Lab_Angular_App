import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../authentication/register-modal/register-modal.component';
import { LoginModalComponent } from '../../authentication/login-modal/login-modal.component';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  protected faLogin = faSignInAlt
  protected faLogout = faSignOutAlt
  protected faRegister = faUserPlus
  
  constructor(
    private modalService: NgbModal, 
    protected authService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  openRegisterModal() {
    const registerRef = this.modalService.open(RegisterModalComponent)
    registerRef.result.then(res => {
      // console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  openLoginModal() {
    const loginRef = this.modalService.open(LoginModalComponent)
    loginRef.result.then(res => {
      // console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  logout() {
    this.authService.logout()
  }

}
