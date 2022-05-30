import { Info } from '../info.model';
import { Product } from '../product/product.model';

export enum OrderStatus {
  Rechazado,
  Pendiente,
  Aprobado,
  Unknown,
}

export interface Order {
  idOrder?: Number;
  idUser: Number;
  orderNumber: String;
  dateTime: Date;
  providerName: String;
  observation: String;
  totalValue: Number;
  status: OrderStatus;
}

export interface OrderResponse {
  info?: Info;
  data?: Array<Order>;
  length?: Number;
  message: String;
  status: String;
}
