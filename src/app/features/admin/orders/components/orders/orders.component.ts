import { Component, OnInit } from '@angular/core';
import { Order } from "../../models/order.model";
import { OrdersService } from "../../services/orders.service";
import { Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import { NgForOf } from "@angular/common";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgForOf
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  headers: string[];

  constructor(
    private orderService: OrdersService,
    private router: Router
  ) {
    this.orders = []
    this.headers = ['uniqueCode', 'status', 'date', 'client', 'items', 'actions']
  }

  ngOnInit(): void {
    this.orderService.findAll().subscribe({
      next: (orders) => {
        this.orders = orders
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  onCreate() {
    this.router.navigate(['admin/orders/create']).then()
  }

  onDelete(order: Order) {
    this.orderService.delete(order.id).pipe(
      switchMap(() => this.orderService.findAll())
    ).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
