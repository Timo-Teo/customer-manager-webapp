import { Component, OnInit } from '@angular/core';
import { ItemsService } from "../../services/items.service";
import { Router } from "@angular/router";
import { Item } from "../../models/item.model";
import { MatButton } from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-items',
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
    MatHeaderCellDef
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {

  items: Item[];
  headers: string[];

  constructor(
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.items = [];
    this.headers = ['name', 'uniqueCode', 'price', 'stock', 'actions'];
  }

  ngOnInit(): void {
    this.itemsService.findAll().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onCreate(): void {
    this.router.navigate(['/admin/items/create']).then();
  }

  onUpdate(item: Item): void {
    this.router.navigate(['/admin/items/', item.id]).then();
  }

  onDelete(item: Item): void {
    this.itemsService.delete(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
