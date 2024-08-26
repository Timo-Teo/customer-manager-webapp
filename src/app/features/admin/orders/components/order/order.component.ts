import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { OrdersService } from "../../services/orders.service";
import { Router } from "@angular/router";
import { CreateOrderDto } from "../../dto/create-order.dto";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ClientsService } from "../../../clients/services/clients.service";
import { ItemsService } from "../../../items/services/items.service";
import { Client } from "../../../clients/models/client.model";
import { Item } from "../../../items/models/item.model";
import { forkJoin } from "rxjs";
import { MatOption, MatSelect } from "@angular/material/select";
import { NgForOf } from "@angular/common";
import { MatCheckbox } from "@angular/material/checkbox";
import { ItemsOrdersDto } from "../../../items/dto/items-orders.dto";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatCheckbox
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  formOrder: FormGroup;
  clients: Client[];
  items: Item[];

  constructor(
    private builder: FormBuilder,
    private orderService: OrdersService,
    private clientService: ClientsService,
    private itemService: ItemsService,
    private router: Router
  ) {
    this.clients = [];
    this.items = [];
    this.formOrder = new FormGroup({});
    this.buildForm() ;

  }

  ngOnInit(): void {
    forkJoin({
      clients: this.clientService.findAll(),
      items: this.itemService.findAll()
    }).subscribe({
      next: ({ clients, items }) => {
        this.clients = clients;
        this.items = items;
        this.buildForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private buildForm() {

    this.formOrder = this.builder.group({
      clientId: ['', Validators.required],
      items: this.builder.array([])
    });

    const itemsFormArray = this.builder.array(
      this.items.map(item =>
        this.builder.group({
          itemId: [item.id],
          selected: [false],
          quantity: [{ value: 0, disabled: true }, Validators.required]
        })
      )
    );

    this.formOrder.setControl('items', itemsFormArray);
  }

  get itemsArray(): FormArray {
    return this.formOrder.get('items') as FormArray;
  }

  onCheckboxChange(index: number) {
    const itemGroup = this.itemsArray.at(index) as FormGroup;
    const selected = itemGroup.get('selected')?.value;

    if (selected) {
      itemGroup.get('quantity')?.enable();
    } else {
      itemGroup.get('quantity')?.reset({ value: 0, disabled: true });
    }
  }

  get clientIdField() {
    return this.formOrder.get('clientId');
  }


  onCreate() {
    if (this.formOrder.invalid) {
      return;
    }

    const formValue = this.formOrder.value;
    const selectedItems = formValue.items
      .filter((item: any) => item.selected)
      .map((item:ItemsOrdersDto) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      }));

    const order: CreateOrderDto = {
      clientId: this.clientIdField?.value,
      items: selectedItems
    };

    this.orderService.create(order).subscribe({
      next: () => {
        this.router.navigate(['admin/orders']).then();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
