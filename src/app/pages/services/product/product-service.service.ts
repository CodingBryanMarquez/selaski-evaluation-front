import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Metodo para la obtención de un solo producto
   * @param id
   * @returns ProductResponse
   */
  getProduct(id: Number): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products/${id}`;
      this.http.get<ProductResponse>(endpoint).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la obtencion de todos los productos
   * @returns ProductResponse
   */
  getAllProduct(): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products`;
      this.http.get<ProductResponse>(endpoint).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la obtención de una orden con todos sus productos
   * @param id
   * @returns ProductResponse
   */
  getOrderProduct(id: Number): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products-orders/${id}`;
      this.http.get<ProductResponse>(endpoint).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la creación de producto
   * @param data
   * @returns ProductResponse
   */
  async postProduct(data: Product): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products`;
      this.http.post<ProductResponse>(endpoint, data).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para actualizar un producto
   * @param data
   * @returns ProductResponse
   */
  putProduct(data: Product, id: Number): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products/${id}`;
      this.http.put<ProductResponse>(endpoint, data).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para eliminar un producto
   * @param id
   * @returns ProductResponse
   */
  deleteProduct(id: Number): Promise<ProductResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}products/${id}`;
      this.http.delete<ProductResponse>(endpoint).subscribe(
        (req: ProductResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
}
