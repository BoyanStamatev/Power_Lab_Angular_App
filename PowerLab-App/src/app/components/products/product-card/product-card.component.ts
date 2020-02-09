import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../ProductModul';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() public product: ProductModel

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
