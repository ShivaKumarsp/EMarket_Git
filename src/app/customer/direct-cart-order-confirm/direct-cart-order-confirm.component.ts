import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-cart-order-confirm',
  templateUrl: './direct-cart-order-confirm.component.html',
  styleUrls: ['./direct-cart-order-confirm.component.css']
})
export class DirectCartOrderConfirmComponent implements OnInit {

  constructor() { }
  public name:any;

  ngOnInit(): void {
    this.name=sessionStorage.getItem('name');
  }
}
