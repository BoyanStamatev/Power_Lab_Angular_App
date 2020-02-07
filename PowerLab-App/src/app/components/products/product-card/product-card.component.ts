import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../ProductModul';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() public product: ProductModel

  constructor() { }

  ngOnInit() {
  }

}
