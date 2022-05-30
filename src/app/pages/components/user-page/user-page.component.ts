import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';
import { User, UserResponse } from '../../services/user/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  config: any;
  collection: any;
  tableCheck: Boolean = false;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Funcion para consultar un usuario
   * @param idUser
   */
  getUserForId(idUser: Number): void {
    this.userService
      .getUser(idUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Funcion para consultar todos los usuarios y guardarlos en una variable para poblar la tabla
   * @param idUser
   */
  getUsers(): void {
    this.tableCheck = false;
    this.userService
      .getAllUser()
      .then((res: UserResponse) => {
        let collectionTable: any = [];
        if (res.data !== []) {
          res.data.map((el) => {
            collectionTable.push({
              idUser: el.idUser,
              name: el.name,
              email: el.email,
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
   * Funcion para cambiar de pagina
   * @param event
   */
  pageChanged(event: any): void {
    this.config.currentPage = event;
  }
}
