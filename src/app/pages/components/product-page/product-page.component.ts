import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from 'src/app/modal/components/modal-delete/modal-delete.component';
import { ModalDetailComponent } from 'src/app/modal/components/modal-detail/modal-detail.component';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ProductServiceService } from '../../services/product/product-service.service';
import { Product, ProductResponse } from '../../services/product/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  config: any;
  collection: any;
  tableCheck: Boolean = false;
  bsModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private productService: ProductServiceService,
    private sharedService: SharedServicesService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Funcion que hace el llamado al servicio para mostrar todos los productos
   */
  getProducts(): void {
    this.tableCheck = false;
    this.productService
      .getAllProduct()
      .then((res: ProductResponse) => {
        let collectionTable: any = [];
        if (res.data !== [] && res.data) {
          res.data.map((el) => {
            collectionTable.push({
              idOrdersProducts: el.idOrdersProducts,
              idOrder: el.idOrder,
              valueUnit: el.valueUnit,
              unit: el.unit,
              description: el.description,
              sku: el.sku,
              quantity: el.quantity,
              qtyBox: el.qtyBox,
              weight: el.weight,
              volumen: el.volumen,
              mark: el.mark,
              status: el.status ? 'Activo' : 'Inactivo',
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
   * Funcion que hace el llamado al servicio para eliminar el producto
   * @param id
   */
  removeProduct(id: number): void {
    this.productService.deleteProduct(id).then(
      (res) => {
        console.log(res);
        this.sharedService.showToasterSuccess(
          '¡Se ha eliminado la orden exitosamente!'
        );
        this.getProducts();
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
   * Funcion para pasar de pagina
   * @param event
   */
  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  /**
   * Funcion para abrir la modal de detalle
   * @param id id del producto
   * @param data información del producto
   */
  openModalDetail(id: Number, data: Product) {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Detalle del producto',
        id,
        data,
        mode: 'Product',
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalDetailComponent,
      initialState
    );
  }

  /**
   * Funcion para abrir la modal de eliminar
   * @param id
   */
  openModalDelete(id: Number) {
    const initialState: ModalOptions = {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        text: '¿Esta Seguro que desea eliminar esta producto?',
        buttonTextAccept: 'Eliminar Producto',
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
        this.removeProduct(res.idDelete);
      }
    });
  }
}
