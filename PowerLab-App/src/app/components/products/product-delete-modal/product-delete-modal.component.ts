import { Component, OnInit, Input } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.scss']
})
export class ProductDeleteModalComponent implements OnInit {
  
  protected faWindowClose = faWindowClose
  @Input() private productId: string

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  delete() {
    this.productsService.deleteProduct(this.productId, this.activeModal)
  }
}
