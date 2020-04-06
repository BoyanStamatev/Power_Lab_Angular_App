import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { ProductModel } from '../../../core/models/ProductModel';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { ReviewModel } from 'src/app/core/models/ReviewModel';
import { ReviewsService } from 'src/app/core/services/reviews/reviews.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent extends BaseComponent implements OnInit {

  protected id: string
  protected product: ProductModel
  protected reviewsId = []
  protected reviews: ReviewModel[]
  private subscriptionP$: Subscription
  private subscriptionR$: Subscription
  protected notFoundMessage = 'PRODUCT NOT FOUND'
  
  constructor (
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private reviewsService: ReviewsService
    ) {
      super()
  }

  ngOnInit() {
    this.reviewsService.getAllReviews()
    this.id = this.route.snapshot.paramMap.get('id')
    
    this.subscriptionP$ = this.store
    .pipe(select(state => state.products.all))
    .subscribe(data => {
      if(data.length > 0) {
        this.product = data.find(p => p._id === this.id)
        this.reviewsId = this.product.reviews
      }
    })

    this.subscriptionR$ = this.store
    .pipe(select(state => state.reviews.all))
    .subscribe(data => {
      if(data.length > 0) {
        this.reviews = data.filter(r => this.reviewsId.includes(r._id))
      }
    })

    
    this.subscriptions.push(this.subscriptionP$)
    this.subscriptions.push(this.subscriptionR$)
  }

}
