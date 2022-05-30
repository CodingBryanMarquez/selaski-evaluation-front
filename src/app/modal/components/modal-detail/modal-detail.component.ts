import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/pages/services/order/order.model';
import { Product } from 'src/app/pages/services/product/product.model';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss'],
})
export class ModalDetailComponent implements OnInit {
  title?: string;
  detail?: Array<string>;
  id?: Number;
  data?: Product | Order;
  mode?: string;
  headArray: Array<string> = [];
  valueArray: Array<string> = [];
  chekDetail: boolean = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    switch (this.mode) {
      case 'Product':
        if (this.data) {
          this.headArray = Object.keys(this.data);
          this.valueArray = Object.values(this.data);
          this.chekDetail = true;
        }
        break;

      case 'Order':
        if (this.data) {
          this.headArray = Object.keys(this.data);
          this.valueArray = Object.values(this.data);
          this.chekDetail = true;
        }
        break;

      default:
        break;
    }
  }

  counter(i: number): Array<Number> {
    return new Array(i);
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
