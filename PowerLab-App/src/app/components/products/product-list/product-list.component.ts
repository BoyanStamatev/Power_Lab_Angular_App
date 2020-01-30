import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products

  constructor() { }

  ngOnInit() {
    this.products = [
      {name: 'P1'},
      {name: 'P2'},
      {name: 'P3'},
      {name: 'P4'},
      {name: 'P5'},
      {name: 'P6'},
    ]

  }

}
