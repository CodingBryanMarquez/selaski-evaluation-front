import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from 'src/app/modal/components/modal-delete/modal-delete.component';
import { ModalDetailComponent } from 'src/app/modal/components/modal-detail/modal-detail.component';
import { ModalFormComponent } from 'src/app/modal/components/modal-form/modal-form.component';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { OrderServiceService } from '../../services/order/order-service.service';
import { Order, OrderResponse } from '../../services/order/order.model';
import { ProductServiceService } from '../../services/product/product-service.service';
import { Product } from '../../services/product/product.model';
moment.locale('es');

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  config: any;
  collection: any;
  tableCheck: Boolean = false;
  title: string = 'Tabla de ordenes';
  modoInterface: Number = 0;
  idOrder: Number = 0;
  bsModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private orderService: OrderServiceService,
    private productService: ProductServiceService,
    private sharedService: SharedServicesService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  /**
   * Funcion que hace el llamado al servicio para mostrar todos las ordernes
   */
  getOrders(): void {
    this.tableCheck = false;
    this.orderService
      .getAllOrder()
      .then((res: OrderResponse) => {
        let collectionTable: any = [];
        if (res.data !== [] && res.data) {
          res.data.map((el) => {
            collectionTable.push({
              idOrder: el.idOrder,
              idUser: el.idUser,
              orderNumber: el.orderNumber,
              dateTime: moment(el.dateTime).format('LL'),
              providerName: el.providerName,
              observation: el.observation,
              totalValue: `USD ${el.totalValue}`,
              status: el.status,
            });
          });
        }
        this.collection = { count: res.length, data: collectionTable };
        this.config = {
          itemsPerPage: 4,
          currentPage: 1,
          totalItems: this.collection.count,
        };
        this.tableCheck = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Funcion que hace el llamado al servicio para eliminar la orden
   * @param id
   */
  removeOrder(id: number): void {
    this.orderService.deleteOrder(id).then(
      (res) => {
        console.log(res);
        this.sharedService.showToasterSuccess(
          '¡Se ha eliminado la orden exitosamente!'
        );
        this.getOrders();
      },
      (err: any) => {
        console.error(err);
        this.sharedService.showToasterError(
          'Ha ocurrido un error al intentar eliminar la orden'
        );
      }
    );
  }

  /**
   * Funcion para la creacion de orden y producto
   * @param data
   */
  async createOrderAndProduct(data: any) {
    const dataForm: Order = {
      dateTime: data.date,
      observation: data.observation,
      orderNumber: data.orderNumber,
      providerName: data.nameProvider,
      status: data.status,
      totalValue: data.totalValue,
      idUser: data.user,
    };
    let dataProductForm: any;

    this.orderService
      .postOrder(dataForm)
      .then((resOrder: any) => {
        if (data.product !== []) {
          for (let i = 0; i < data.product.length; i++) {
            dataProductForm = {
              description: data.product[i].description,
              idOrder: resOrder.info.insertId,
              mark: data.product[i].mark,
              qtyBox: data.product[i].qtyBox,
              quantity: data.product[i].quantity,
              sku: data.product[i].sku,
              status: data.product[i].statusProduct,
              unit: data.product[i].unit,
              valueUnit: data.product[i].valueUnit,
              volumen: data.product[i].volumen,
              weight: data.product[i].weight,
            };
            this.productService
              .postProduct(dataProductForm)
              .then((resProduct: any) => {
                console.log(resProduct);
              })
              .catch((err: any) => {
                console.error(err);
              });
          }
          this.sharedService.showToasterSuccess(
            '¡Se ha creado la orden y lo(s) producto(s) exitosamente!'
          );
          this.getOrders();
        } else {
          console.log(resOrder);
          this.sharedService.showToasterSuccess(
            '¡Se ha creado la orden con su producto exitosamente!'
          );
          this.getOrders();
        }
      })
      .catch((err: any) => {
        console.error(err);
        this.sharedService.showToasterError(
          'Ha ocurrido un error al intentar crear el producto'
        );
      });
  }

  /**
   * Funcion para la actualizacion de orden y producto
   * @param data
   */
  async modifyOrderAndProduct(data: any) {
    const dataIdForm = data.idOrder;
    const myMomentObject: any = moment(data.date, 'YYYY-MM-DD');
    const dataForm: Order = {
      dateTime: myMomentObject,
      observation: data.observation,
      orderNumber: data.orderNumber,
      providerName: data.nameProvider,
      status: data.status,
      totalValue: data.totalValue,
      idUser: data.user,
    };
    let dataProductForm: any;

    this.orderService
      .putOrder(dataForm, dataIdForm)
      .then((resOrder: any) => {
        if (data.product !== []) {
          for (let i = 0; i < data.product.length; i++) {
            const dataIdProductForm = data.product[i].idProduct;
            dataProductForm = {
              description: data.product[i].description,
              idOrder: dataIdForm,
              mark: data.product[i].mark,
              qtyBox: data.product[i].qtyBox,
              quantity: data.product[i].quantity,
              sku: data.product[i].sku,
              status: data.product[i].statusProduct,
              unit: data.product[i].unit,
              valueUnit: data.product[i].valueUnit,
              volumen: data.product[i].volumen,
              weight: data.product[i].weight,
            };
            this.productService
              .putProduct(dataProductForm, dataIdProductForm)
              .then((resProduct: any) => {
                console.log(resProduct);
              })
              .catch((err: any) => {
                console.error(err);
              });
          }
          this.sharedService.showToasterSuccess(
            '¡Se ha modificado la orden y lo(s) producto(s) exitosamente!'
          );
          this.getOrders();
        } else {
          console.log(resOrder);
          this.sharedService.showToasterSuccess(
            '¡Se ha creado la orden con su producto exitosamente!'
          );
          this.getOrders();
        }
      })
      .catch((err: any) => {
        console.error(err);
        this.sharedService.showToasterError(
          'Ha ocurrido un error al intentar crear el producto'
        );
      });
  }

  /**
   * Funcion para pasar de pagina
   * @param event
   */
  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  /**
   * Funcion para abrir la modal de crear
   */
  openModalCreate() {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered custom-modal',
      initialState: {
        title: 'Crear orden/producto',
        buttonTextAccept: 'Crear orden/producto',
        buttonTextCancel: 'Cancelar',
        mode: 'Add',
      },
    };
    this.bsModalRef = this.modalService.show(ModalFormComponent, initialState);
    this.bsModalRef.content.event.subscribe((res: any) => {
      if (res) {
        this.createOrderAndProduct(res);
      } else if (!res) {
        this.sharedService.showToasterError(
          'Ha ocurrido un error al mandar la información intente nuevamente'
        );
      }
    });
  }

  /**
   * Funcion para abrir la modal de detalle
   * @param id id de la orden
   * @param data información de la orden
   */
  openModalDetail(id: Number, data: Order) {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Detalle de la orden',
        id,
        data,
        mode: 'Order',
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalDetailComponent,
      initialState
    );
  }

  /**
   * Funcion para abrir la modal de actualizar
   * @param id
   * @param data
   */
  openModalUpdate(id: Number, data: Order) {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered custom-modal',
      initialState: {
        title: 'Modificar orden/producto',
        buttonTextAccept: 'Modificar orden/producto',
        buttonTextCancel: 'Cancelar',
        mode: 'Update',
        data,
        id,
      },
    };
    this.bsModalRef = this.modalService.show(ModalFormComponent, initialState);
    this.bsModalRef.content.event.subscribe((res: any) => {
      if (res) {
        this.modifyOrderAndProduct(res);
      } else if (!res) {
        this.sharedService.showToasterError(
          'Ha ocurrido un error al mandar la información intente nuevamente'
        );
      }
    });
  }

  /**
   * Funcion para abrir la modal de eliminar
   * @param id
   */
  openModalDelete(id: Number) {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        text: '¿Esta Seguro que desea eliminar esta orden? Esto ocasionara que todos los productos que posean esta orden se borren inmediatamente.',
        buttonTextAccept: 'Eliminar Orden',
        buttonTextCancel: 'Cancelar',
        title: 'Confirmación de eliminación',
        id,
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalDeleteComponent,
      initialState
    );
    this.bsModalRef.content.event.subscribe((res: any) => {
      if (res.option) {
        this.removeOrder(res.idDelete);
      }
    });
  }
}
