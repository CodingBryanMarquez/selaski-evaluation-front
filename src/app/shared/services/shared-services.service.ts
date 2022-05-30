import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedServicesService {
  constructor(private toastr: ToastrService) {}

  showToasterSuccess(mensage: string): void {
    this.toastr.success(mensage);
  }

  showToasterError(mensage: string): void {
    this.toastr.error(mensage);
  }

  showToasterInfo(mensage: string): void {
    this.toastr.info(mensage);
  }
}
