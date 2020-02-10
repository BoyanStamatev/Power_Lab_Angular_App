import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() public product: ProductModel

  constructor(
    public authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  navigateToDetails() {
    this.router.navigate([`/product/details/${this.product._id}`])
  }

}
