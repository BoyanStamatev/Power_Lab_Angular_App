import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { ProductModel } from '../models/ProductModel';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent extends BaseComponent implements OnInit {

  protected id: string
  protected product: ProductModel
  private subscription$: Subscription
  
  constructor (
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private productsService: ProductsService
    ) {
      super()
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.productsService.getAllProduts()
    
    this.subscription$ = this.store
    .pipe(select(state => state.products.all))
    .subscribe(data => {
      if(data.length > 0) {
        this.product = data.find(p => p._id === this.id)
      }
    })

    this.subscriptions.push(this.subscription$)
  }

}
