import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../products/models/ProductModel';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../authentication/register-modal/register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 protected products$: Observable<ProductModel[]>

  constructor(
    protected authService: AuthenticationService,
    private productsService: ProductsService,
    private store: Store<AppState>,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productsService.getAllProducts()
    this.products$ = this.store.pipe(select(state => state.products.all
      .sort((a,b) => b.likes.length - a.likes.length)
      .slice(0, 3) ))
  }

  openRegisterModal() {
    const registerRef = this.modalService.open(RegisterModalComponent)
    registerRef.result.then((res) => {

    }).catch((err) => {
      
    })

  }

}
