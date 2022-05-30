import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit {
  title?: string;
  text?: string;
  buttonTextAccept?: string;
  buttonTextCancel?: string;
  id?: Number;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  /**
   * Funcion para cerrar la modal
   * @param option
   * @param idDelete
   */
  closeModal(option: Boolean, idDelete?: Number): void {
    /**
     * Aqui el valor option sera para condicional el componente que llamo a la modal,
     * si es true se borra el elemento,
     * si es false no se elimina.
     * Y el idDelete es para identificar que elemento se va a eliminar
     */
    if (option && idDelete) {
      this.event.emit({ option, idDelete });
      this.bsModalRef.hide();
    } else if (!option && idDelete) {
      this.event.emit({ option, idDelete });
      this.bsModalRef.hide();
    } else {
      this.bsModalRef.hide();
    }
  }
}
