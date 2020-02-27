import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsEditModalComponent } from './product-reviews-edit-modal.component';

describe('ProductReviewsEditModalComponent', () => {
  let component: ProductReviewsEditModalComponent;
  let fixture: ComponentFixture<ProductReviewsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
