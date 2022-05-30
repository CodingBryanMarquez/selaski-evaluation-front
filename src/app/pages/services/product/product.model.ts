import { Info } from '../info.model';

export enum ProductUnit {
  cm,
  kg,
  lb,
  cm3,
  m,
  gr,
  ft3,
}

export interface Product {
  idOrdersProducts?: Number;
  idOrder: Number;
  valueUnit: Number;
  unit: ProductUnit;
  description: String;
  sku: String;
  quantity: Number;
  qtyBox: Number;
  weight: String;
  volumen: String;
  mark: String;
  status: Boolean;
}

export interface ProductResponse {
  info?: Info;
  data?: Array<Product>;
  length?: Number;
  message: String;
  status: String;
}
