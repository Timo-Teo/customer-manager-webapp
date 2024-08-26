import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Order } from "../models/order.model";
import { CreateOrderDto } from "../dto/create-order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  appUrl = `${environment.API_URL}/${environment.API_VERSION}/purchase-orders`
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Order[]>(this.appUrl);
  }

  findById(id: number) {
    return this.http.get<Order>(`${this.appUrl}/${id}`);
  }

  create(order: CreateOrderDto) {
    return this.http.post<Order>(this.appUrl, order);
  }

  update(order: Order) {
    return this.http.put<Order>(`${this.appUrl}/${order.id}`, order);
  }

  delete(id: number) {
    return this.http.delete<Order>(`${this.appUrl}/${id}`);
  }
}
