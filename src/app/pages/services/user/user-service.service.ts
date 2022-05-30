import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Metodo para la obtención de un solo usuario
   * @param id
   * @returns UserResponse
   */
  getUser(id: Number): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}users/${id}`;
      this.http.get<UserResponse>(endpoint).subscribe(
        (req: UserResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Metodo para la obtencion de todos los usuarios
   * @returns UserResponse
   */
  getAllUser(): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.apiUrl}users`;
      this.http.get<UserResponse>(endpoint).subscribe(
        (req: UserResponse) => {
          resolve(req);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
}
