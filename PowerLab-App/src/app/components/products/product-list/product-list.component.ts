import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsModule } from '../products.module';
import { ProductModel } from '../models/ProductModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() protected products: ProductsModule[]

  protected pageSize: number = 6
  protected currentPage: number = 1

  constructor() { }

  ngOnInit() {
    
  }

  changePage(page) {
    this.currentPage = page
  }

  trackByIds(index: number, product: ProductModel): string {
    return product._id
  }

}
