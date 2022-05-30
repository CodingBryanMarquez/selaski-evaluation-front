import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrderStatus } from 'src/app/pages/services/order/order.model';
import { UserServiceService } from 'src/app/pages/services/user/user-service.service';
import { UserResponse } from 'src/app/pages/services/user/user.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductUnit } from 'src/app/pages/services/product/product.model';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ProductServiceService } from 'src/app/pages/services/product/product-service.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  title?: string;
  detail?: Array<string>;
  id?: Number;
  data?: any;
  mode?: string;
  buttonTextAccept?: string;
  buttonTextCancel?: string;
  collectionSelect?: Array<any>;
  statusOrder?: Array<any>;
  statusProduct?: Array<any>;
  form?: FormGroup;
  statusOrderEnum = OrderStatus;
  statusProductEnum = ProductUnit;
  countArray: any = 0;
  statusCurrentProduct: Array<any> = [
    { id: 0, label: 'Inactivo' },
    { id: 1, label: 'Activo' },
  ];
  submitted = false;
  dataUpdate: any;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserServiceService,
    private sharedService: SharedServicesService,
    private productService: ProductServiceService,
    private fb: FormBuilder
  ) {
    this.getUsers();
    this.setStatusOrder();
    this.setStatusProduct();
    this.setForm();
  }

  ngOnInit(): void {
    if (this.mode === 'Update') {
      this.setUpdateForm(this.id, this.data);
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  createdData() {
    this.submitted = false;
    if (this.mode === 'Update' && this.form?.status === 'VALID') {
      if (JSON.stringify(this.dataUpdate) !== JSON.stringify(this.form.value)) {
        this.event.emit(this.form?.value);
        this.closeModal();
      } else {
        this.closeModal();
      }
    } else if (this.form?.status === 'VALID') {
      this.event.emit(this.form?.value);
      this.closeModal();
    } else if (this.form?.status === 'INVALID') {
      this.submitted = true;
      this.sharedService.showToasterError(
        'Se necesita completar todos los campos requeridos'
      );
    }
  }

  getUsers(): void {
    this.userService
      .getAllUser()
      .then((res: UserResponse) => {
        let collection: any = [];
        if (res.data !== []) {
          res.data.map((el) => {
            collection.push({
              id: el.idUser,
              label: el.name,
            });
          });
          this.collectionSelect = collection;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setStatusOrder() {
    const collection = [];
    for (let i = 0; i < Object.keys(this.statusOrderEnum).length / 2; i++) {
      collection.push({
        id: i,
        label: this.statusOrderEnum[i],
      });
    }
    this.statusOrder = collection;
  }

  setStatusProduct() {
    const collection = [];
    for (let i = 0; i < Object.keys(this.statusProductEnum).length / 2; i++) {
      collection.push({
        id: i,
        label: this.statusProductEnum[i],
      });
    }
    this.statusProduct = collection;
  }

  setForm() {
    this.form = this.fb.group({
      user: [null, Validators.required],
      orderNumber: [null, Validators.required],
      date: [null, Validators.required],
      nameProvider: [null, Validators.required],
      observation: [null],
      totalValue: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [null, Validators.required],
      product: this.fb.array([]),
      validate: true,
    });
  }

  setUpdateForm(id: any, data: any) {
    const value = Number(data.totalValue.replace('USD ', ''));
    this.form = this.fb.group({
      idOrder: id,
      user: [data.idUser, Validators.required],
      orderNumber: [data.orderNumber, Validators.required],
      date: [data.dateTime, Validators.required],
      nameProvider: [data.providerName, Validators.required],
      observation: [data.observation],
      totalValue: [
        value,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      status: [data.status, Validators.required],
      product: this.fb.array([]),
      validate: true,
    });
    this.getProducts(id);
  }

  async getProducts(id: Number) {
    await this.productService
      .getOrderProduct(id)
      .then((res) => {
        if (res.data) {
          const data: Array<any> = res.data;
          for (let i = 0; i < res.data?.length; i++) {
            this.addControl(true, data[i]);
          }
        }
      })
      .catch((err) => {});
    this.dataUpdate = this.form?.value;
  }

  get formControl(): any {
    if (this.form) {
      return this.form.controls;
    }
  }

  get productsFieldAsFormArray(): any {
    if (this.form) {
      return this.form.get('product') as FormArray;
    }
  }

  get productsFormControl(): any {
    if (this.form) {
      return this.form.controls['product'] as FormArray;
    }
  }

  product(): any {
    return this.fb.group({
      valueUnit: [null, Validators.required],
      unit: [null, Validators.required],
      description: [null],
      sku: [null, Validators.required],
      quantity: [null, Validators.required],
      qtyBox: [null, Validators.required],
      weight: [null, Validators.required],
      volumen: [null, Validators.required],
      mark: [null, Validators.required],
      statusProduct: [null, Validators.required],
      validate: true,
    });
  }

  productUpdate(data: any): any {
    return this.fb.group({
      idProduct: [data.idOrdersProducts],
      valueUnit: [data.valueUnit, Validators.required],
      unit: [data.unit, Validators.required],
      description: [data.description],
      sku: [data.sku, Validators.required],
      quantity: [data.quantity, Validators.required],
      qtyBox: [data.qtyBox, Validators.required],
      weight: [data.weight, Validators.required],
      volumen: [data.volumen, Validators.required],
      mark: [data.mark, Validators.required],
      statusProduct: [data.status, Validators.required],
      validate: true,
    });
  }

  addControl(option?: Boolean, data?: any): void {
    if (option) {
      this.productsFieldAsFormArray.push(this.productUpdate(data));
      this.countArray += 1;
    } else {
      this.productsFieldAsFormArray.push(this.product());
      this.countArray += 1;
    }
  }

  remove(i: number): void {
    this.productsFieldAsFormArray.removeAt(i);
    this.countArray -= 1;
  }
}
