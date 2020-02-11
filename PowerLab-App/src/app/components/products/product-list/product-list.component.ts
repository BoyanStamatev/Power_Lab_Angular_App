import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsModule } from '../products.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() protected products$: Observable<ProductsModule[]>

  protected pageSize: number = 6
  protected currentPage: number = 1

  constructor() { }

  ngOnInit() {
    
  }

  changePage(page) {
    this.currentPage = page
  }

}
