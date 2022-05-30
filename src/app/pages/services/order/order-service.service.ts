import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrderResponse } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Metodo para la obtención de una sola orden
   * @param id
   * @returns OrderResponse
   */
  getOrder(id: Number): Promise<OrderResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}orders/${id}`;
      this.http.get<OrderResponse>(endpoint).subscribe(
        (req: OrderResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la obtencion de todos las ordenes
   * @returns OrderResponse
   */
  getAllOrder(): Promise<OrderResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}orders`;
      this.http.get<OrderResponse>(endpoint).subscribe(
        (req: OrderResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la creación de una orden
   * @param data
   * @returns OrderResponse
   */
  postOrder(data: Order): Promise<OrderResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}orders`;
      this.http.post<OrderResponse>(endpoint, data).subscribe(
        (req: OrderResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para actualizar una orden
   * @param data
   * @returns OrderResponse
   */
  putOrder(data: Order, id: Number): Promise<OrderResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}orders/${id}`;
      this.http.put<OrderResponse>(endpoint, data).subscribe(
        (req: OrderResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para eliminar una orden
   * @param id
   * @returns OrderResponse
   */
  deleteOrder(id: Number): Promise<OrderResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}orders/${id}`;
      this.http.delete<OrderResponse>(endpoint).subscribe(
        (req: OrderResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
}
